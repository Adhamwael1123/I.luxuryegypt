
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileText, Plus, Edit, Search, ArrowLeft, Trash2, Calendar } from "lucide-react";

// Form validation schema
const postFormSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  titleEn: z.string().min(1, "English title is required"),
  titleEs: z.string().optional(),
  titleFr: z.string().optional(),
  titleJp: z.string().optional(),
  bodyEn: z.string().optional(),
  bodyEs: z.string().optional(),
  bodyFr: z.string().optional(),
  bodyJp: z.string().optional(),
  featuredImage: z.string().optional(),
  excerpt: z.string().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
});

type PostFormData = z.infer<typeof postFormSchema>;

export default function AdminPosts() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingPost, setDeletingPost] = useState<any>(null);
  const { toast } = useToast();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const { data: postsResponse, isLoading, refetch } = useQuery({
    queryKey: ["/api/cms/posts"],
    queryFn: async () => {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/cms/posts", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Failed to fetch posts");
      return await response.json();
    },
    enabled: !!localStorage.getItem("adminToken"),
  });

  const posts = postsResponse?.posts || [];

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (data: PostFormData) => {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/cms/posts", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create post");
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/stats"] });
      setIsCreateDialogOpen(false);
      toast({ title: "Blog post created successfully!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error creating post", 
        description: error.message || "Something went wrong",
        variant: "destructive" 
      });
    },
  });

  // Update post mutation
  const updatePostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PostFormData> }) => {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/cms/posts/${id}`, {
        method: "PUT",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update post");
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/stats"] });
      setIsEditDialogOpen(false);
      setEditingPost(null);
      toast({ title: "Blog post updated successfully!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error updating post", 
        description: error.message || "Something went wrong",
        variant: "destructive" 
      });
    },
  });

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/cms/posts/${id}`, {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${token}`
        },
      });
      if (!response.ok) throw new Error("Failed to delete post");
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/stats"] });
      setIsDeleteDialogOpen(false);
      setDeletingPost(null);
      toast({ title: "Blog post deleted successfully!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error deleting post", 
        description: error.message || "Something went wrong",
        variant: "destructive" 
      });
    },
  });

  // Form for creating posts
  const createForm = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      slug: "",
      titleEn: "",
      titleEs: "",
      titleFr: "",
      titleJp: "",
      bodyEn: "",
      bodyEs: "",
      bodyFr: "",
      bodyJp: "",
      featuredImage: "",
      excerpt: "",
      status: "draft",
    },
  });

  // Form for editing posts
  const editForm = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
  });

  // Reset edit form when editing post changes
  useEffect(() => {
    if (editingPost) {
      editForm.reset({
        slug: editingPost.slug || "",
        titleEn: editingPost.titleEn || "",
        titleEs: editingPost.titleEs || "",
        titleFr: editingPost.titleFr || "",
        titleJp: editingPost.titleJp || "",
        bodyEn: editingPost.bodyEn || "",
        bodyEs: editingPost.bodyEs || "",
        bodyFr: editingPost.bodyFr || "",
        bodyJp: editingPost.bodyJp || "",
        featuredImage: editingPost.featuredImage || "",
        excerpt: editingPost.excerpt || "",
        status: editingPost.status || "draft",
      });
    }
  }, [editingPost, editForm]);

  const onCreateSubmit = (data: PostFormData) => {
    createPostMutation.mutate(data);
  };

  const onEditSubmit = (data: PostFormData) => {
    if (editingPost) {
      updatePostMutation.mutate({ id: editingPost.id, data });
    }
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (post: any) => {
    setDeletingPost(post);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingPost) {
      deletePostMutation.mutate(deletingPost.id);
    }
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter((post: any) =>
    post.titleEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/admin")}
                className="mr-4"
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Blog Posts</h1>
                <p className="text-sm text-gray-500">Manage blog content</p>
              </div>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-new-post">
                  <Plus className="h-4 w-4 mr-2" />
                  Write New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Blog Post</DialogTitle>
                  <DialogDescription>
                    Create a new blog post for your travel website.
                  </DialogDescription>
                </DialogHeader>
                <Form {...createForm}>
                  <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={createForm.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Slug (URL)</FormLabel>
                            <FormControl>
                              <Input placeholder="my-blog-post" {...field} data-testid="input-slug" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-status">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={createForm.control}
                      name="titleEn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title (English)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter post title" {...field} data-testid="input-title" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={createForm.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Excerpt</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Brief description of the post" {...field} data-testid="textarea-excerpt" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={createForm.control}
                      name="bodyEn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content (English)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Write your blog post content here..." 
                              rows={6} 
                              {...field} 
                              data-testid="textarea-content" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={createForm.control}
                      name="featuredImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Featured Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/image.jpg" {...field} data-testid="input-image" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsCreateDialogOpen(false)}
                        data-testid="button-cancel"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={createPostMutation.isPending}
                        data-testid="button-create"
                      >
                        {createPostMutation.isPending ? "Creating..." : "Create Post"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Blog Posts ({posts.length})
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                  data-testid="input-search"
                />
              </div>
            </CardTitle>
            <CardDescription>
              Manage your blog posts and articles
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-sm text-gray-500">Loading posts...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {posts.length === 0 ? "No blog posts yet" : "No posts match your search"}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {posts.length === 0 
                    ? "Get started by creating your first blog post." 
                    : "Try adjusting your search terms."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post: any) => (
                  <div 
                    key={post.id} 
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    data-testid={`post-${post.id}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-gray-900" data-testid={`text-title-${post.id}`}>
                            {post.titleEn || "Untitled"}
                          </h3>
                          <Badge 
                            variant={post.status === "published" ? "default" : "secondary"}
                            data-testid={`badge-status-${post.id}`}
                          >
                            {post.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2" data-testid={`text-slug-${post.id}`}>
                          Slug: {post.slug}
                        </p>
                        {post.excerpt && (
                          <p className="text-sm text-gray-500 mb-2" data-testid={`text-excerpt-${post.id}`}>
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center text-xs text-gray-400 gap-4">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Created: {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                          {post.updatedAt && post.updatedAt !== post.createdAt && (
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Updated: {new Date(post.updatedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(post)}
                          data-testid={`button-edit-${post.id}`}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(post)}
                          className="text-red-600 hover:text-red-700"
                          data-testid={`button-delete-${post.id}`}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Update your blog post information.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug (URL)</FormLabel>
                      <FormControl>
                        <Input placeholder="my-blog-post" {...field} data-testid="input-edit-slug" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-edit-status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={editForm.control}
                name="titleEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (English)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter post title" {...field} data-testid="input-edit-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Brief description of the post" {...field} data-testid="textarea-edit-excerpt" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="bodyEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content (English)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your blog post content here..." 
                        rows={6} 
                        {...field} 
                        data-testid="textarea-edit-content" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="featuredImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} data-testid="input-edit-image" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditingPost(null);
                  }}
                  data-testid="button-edit-cancel"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={updatePostMutation.isPending}
                  data-testid="button-edit-save"
                >
                  {updatePostMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingPost?.titleEn}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setDeletingPost(null);
              }}
              data-testid="button-delete-cancel"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={deletePostMutation.isPending}
              data-testid="button-delete-confirm"
            >
              {deletePostMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
