
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { FileText, Plus, Edit, Search, ArrowLeft } from "lucide-react";

export default function AdminPosts() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["/api/cms/posts"],
    queryFn: () => apiRequest("/api/cms/posts"),
    enabled: !!localStorage.getItem("adminToken"),
  });

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
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Blog Posts</h1>
                <p className="text-sm text-gray-500">Manage blog content</p>
              </div>
            </div>
            <Button onClick={() => setLocation("/admin/posts/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Write New Post
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Blog Posts
            </CardTitle>
            <CardDescription>
              Manage your blog posts and articles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Blog management coming soon</h3>
              <p className="mt-1 text-sm text-gray-500">
                Blog post management functionality will be implemented soon.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
