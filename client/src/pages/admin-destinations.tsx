import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Search, Edit, Trash2, Eye, EyeOff, Star, MapPin, Clock, Users, Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin-layout";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertDestinationSchema } from "@shared/schema";

type Destination = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  heroImage: string;
  gallery: string[];
  highlights: string[];
  bestTimeToVisit?: string;
  duration?: string;
  difficulty: string;
  region: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
};

// Form schema for creating/editing destinations
const destinationFormSchema = insertDestinationSchema.extend({
  gallery: z.union([z.array(z.string()), z.string()]).transform(val => 
    typeof val === 'string' ? val.split(',').map(s => s.trim()).filter(s => s) : val
  ).default([]),
  highlights: z.union([z.array(z.string()), z.string()]).transform(val => 
    typeof val === 'string' ? val.split(',').map(s => s.trim()).filter(s => s) : val
  ).default([]),
});

type DestinationFormData = z.infer<typeof destinationFormSchema>;

export default function AdminDestinations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [deletingDestination, setDeletingDestination] = useState<Destination | null>(null);

  const { toast } = useToast();

  // Fetch destinations
  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ['/api/cms/destinations'],
  });

  // Create form
  const createForm = useForm<DestinationFormData>({
    resolver: zodResolver(destinationFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      shortDescription: "",
      heroImage: "",
      gallery: [],
      highlights: [],
      bestTimeToVisit: "",
      duration: "",
      difficulty: "Easy",
      region: "",
      featured: false,
      published: true,
    },
  });

  // Edit form
  const editForm = useForm<DestinationFormData>({
    resolver: zodResolver(destinationFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      shortDescription: "",
      heroImage: "",
      gallery: [],
      highlights: [],
      bestTimeToVisit: "",
      duration: "",
      difficulty: "Easy",
      region: "",
      featured: false,
      published: true,
    },
  });

  // Create mutation
  const createDestinationMutation = useMutation({
    mutationFn: (data: DestinationFormData) =>
      apiRequest('POST', '/api/cms/destinations', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/destinations'] });
      queryClient.invalidateQueries({ queryKey: ['/api/cms/stats'] });
      setIsCreateDialogOpen(false);
      createForm.reset();
      toast({
        title: "Success",
        description: "Destination created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to create destination",
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateDestinationMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DestinationFormData> }) =>
      apiRequest('PUT', `/api/cms/destinations/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/destinations'] });
      setIsEditDialogOpen(false);
      setEditingDestination(null);
      editForm.reset();
      toast({
        title: "Success",
        description: "Destination updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update destination",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteDestinationMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest('DELETE', `/api/cms/destinations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cms/destinations'] });
      queryClient.invalidateQueries({ queryKey: ['/api/cms/stats'] });
      setIsDeleteDialogOpen(false);
      setDeletingDestination(null);
      toast({
        title: "Success",
        description: "Destination deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete destination",
        variant: "destructive",
      });
    },
  });

  const onCreateSubmit = (data: DestinationFormData) => {
    createDestinationMutation.mutate(data);
  };

  const onEditSubmit = (data: DestinationFormData) => {
    if (editingDestination) {
      updateDestinationMutation.mutate({
        id: editingDestination.id,
        data,
      });
    }
  };

  const handleEdit = (destination: Destination) => {
    setEditingDestination(destination);
    editForm.reset({
      ...destination,
      gallery: destination.gallery || [],
      highlights: destination.highlights || [],
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (destination: Destination) => {
    setDeletingDestination(destination);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingDestination) {
      deleteDestinationMutation.mutate(deletingDestination.id);
    }
  };

  // Filter destinations based on search term
  const filteredDestinations = (destinations as Destination[]).filter((destination: Destination) =>
    destination.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.region?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Destinations" description="Manage travel destinations">
      {/* Create Destination Dialog */}
      <div className="mb-6 flex justify-end">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-new-destination">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Destination
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Destination</DialogTitle>
                  <DialogDescription>
                    Add a new travel destination to your website.
                  </DialogDescription>
                </DialogHeader>
                <Form {...createForm}>
                  <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={createForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Destination Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Cairo" {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Slug (URL)</FormLabel>
                            <FormControl>
                              <Input placeholder="cairo" {...field} data-testid="input-slug" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={createForm.control}
                        name="region"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Region</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-region">
                                  <SelectValue placeholder="Select region" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Upper Egypt">Upper Egypt</SelectItem>
                                <SelectItem value="Lower Egypt">Lower Egypt</SelectItem>
                                <SelectItem value="Red Sea">Red Sea</SelectItem>
                                <SelectItem value="Sinai">Sinai</SelectItem>
                                <SelectItem value="Western Desert">Western Desert</SelectItem>
                                <SelectItem value="Eastern Desert">Eastern Desert</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="difficulty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Difficulty Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                              <FormControl>
                                <SelectTrigger data-testid="select-difficulty">
                                  <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Easy">Easy</SelectItem>
                                <SelectItem value="Moderate">Moderate</SelectItem>
                                <SelectItem value="Challenging">Challenging</SelectItem>
                                <SelectItem value="Expert">Expert</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={createForm.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                              <Input placeholder="2-3 days" {...field} value={field.value || ""} data-testid="input-duration" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="bestTimeToVisit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Best Time to Visit</FormLabel>
                            <FormControl>
                              <Input placeholder="October to April" {...field} value={field.value || ""} data-testid="input-best-time" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={createForm.control}
                      name="heroImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hero Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} data-testid="input-hero-image" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={createForm.control}
                      name="shortDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Description</FormLabel>
                          <FormControl>
                            <Input placeholder="Brief tagline or summary" {...field} value={field.value || ""} data-testid="input-short-description" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={createForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Detailed description of the destination..." 
                              className="min-h-[100px]" 
                              {...field} 
                              data-testid="input-description" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={createForm.control}
                      name="highlights"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Highlights (comma-separated)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Great Pyramids, Sphinx, Solar Boat Museum" 
                              {...field} 
                              value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              data-testid="input-highlights" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={createForm.control}
                      name="gallery"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gallery URLs (comma-separated)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://image1.jpg, https://image2.jpg" 
                              {...field} 
                              value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              data-testid="input-gallery" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center space-x-6">
                      <FormField
                        control={createForm.control}
                        name="featured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Featured</FormLabel>
                              <div className="text-sm text-muted-foreground">
                                Show this destination prominently
                              </div>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="switch-featured"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={createForm.control}
                        name="published"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Published</FormLabel>
                              <div className="text-sm text-muted-foreground">
                                Make this destination visible to visitors
                              </div>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                data-testid="switch-published"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsCreateDialogOpen(false)}
                        data-testid="button-cancel-create"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={createDestinationMutation.isPending}
                        data-testid="button-save-destination"
                      >
                        {createDestinationMutation.isPending ? "Creating..." : "Create Destination"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
        </div>

      {/* Destinations List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  All Destinations
                </CardTitle>
                <p className="text-muted-foreground text-sm mt-1">
                  {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-destinations"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="text-muted-foreground">Loading destinations...</div>
              </div>
            ) : filteredDestinations.length === 0 ? (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="text-muted-foreground">
                  {searchTerm ? "No destinations found matching your search." : "No destinations yet. Create your first destination!"}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDestinations.map((destination: Destination) => (
                  <div
                    key={destination.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    data-testid={`destination-item-${destination.id}`}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {destination.heroImage && (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={destination.heroImage}
                            alt={destination.name}
                            className="w-full h-full object-cover"
                            data-testid={`destination-image-${destination.id}`}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg truncate" data-testid={`destination-name-${destination.id}`}>
                            {destination.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            {destination.featured && (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                            <Badge 
                              variant={destination.published ? "default" : "secondary"}
                              className={destination.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                            >
                              {destination.published ? (
                                <><Eye className="h-3 w-3 mr-1" /> Published</>
                              ) : (
                                <><EyeOff className="h-3 w-3 mr-1" /> Draft</>
                              )}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {destination.region}
                            </span>
                            {destination.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {destination.duration}
                              </span>
                            )}
                            {destination.difficulty && (
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {destination.difficulty}
                              </span>
                            )}
                          </div>
                          {destination.shortDescription && (
                            <p className="truncate text-xs">{destination.shortDescription}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(destination)}
                        data-testid={`button-edit-${destination.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(destination)}
                        data-testid={`button-delete-${destination.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

      {/* Edit Destination Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Destination</DialogTitle>
            <DialogDescription>
              Update destination details and information.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Cairo" {...field} data-testid="input-edit-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug (URL)</FormLabel>
                      <FormControl>
                        <Input placeholder="cairo" {...field} data-testid="input-edit-slug" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-edit-region">
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Upper Egypt">Upper Egypt</SelectItem>
                          <SelectItem value="Lower Egypt">Lower Egypt</SelectItem>
                          <SelectItem value="Red Sea">Red Sea</SelectItem>
                          <SelectItem value="Sinai">Sinai</SelectItem>
                          <SelectItem value="Western Desert">Western Desert</SelectItem>
                          <SelectItem value="Eastern Desert">Eastern Desert</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger data-testid="select-edit-difficulty">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Moderate">Moderate</SelectItem>
                          <SelectItem value="Challenging">Challenging</SelectItem>
                          <SelectItem value="Expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="2-3 days" {...field} value={field.value || ""} data-testid="input-edit-duration" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="bestTimeToVisit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Best Time to Visit</FormLabel>
                      <FormControl>
                        <Input placeholder="October to April" {...field} value={field.value || ""} data-testid="input-edit-best-time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={editForm.control}
                name="heroImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hero Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} data-testid="input-edit-hero-image" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief tagline or summary" {...field} value={field.value || ""} data-testid="input-edit-short-description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Detailed description of the destination..." 
                        className="min-h-[100px]" 
                        {...field} 
                        data-testid="input-edit-description" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="highlights"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Highlights (comma-separated)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Great Pyramids, Sphinx, Solar Boat Museum" 
                        {...field} 
                        value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        data-testid="input-edit-highlights" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="gallery"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gallery URLs (comma-separated)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://image1.jpg, https://image2.jpg" 
                        {...field} 
                        value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        data-testid="input-edit-gallery" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-6">
                <FormField
                  control={editForm.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Featured</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Show this destination prominently
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="switch-edit-featured"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={editForm.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Published</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Make this destination visible to visitors
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="switch-edit-published"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditingDestination(null);
                    editForm.reset();
                  }}
                  data-testid="button-cancel-edit"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={updateDestinationMutation.isPending}
                  data-testid="button-update-destination"
                >
                  {updateDestinationMutation.isPending ? "Updating..." : "Update Destination"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the destination
              "{deletingDestination?.name}" and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              disabled={deleteDestinationMutation.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete"
            >
              {deleteDestinationMutation.isPending ? "Deleting..." : "Delete Destination"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}