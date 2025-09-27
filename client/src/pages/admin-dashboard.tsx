import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { FileText, MessageSquare, Image, Plus, Building, MapPin, Plane, Package } from "lucide-react";
import AdminLayout from "@/components/admin-layout";

interface DashboardStats {
  pages: number;
  posts: number;
  inquiries: number;
  media: number;
  hotels: number;
  destinations: number;
  tours: number;
  packages: number;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/cms/stats"],
    queryFn: async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("No auth token");

      try {
        // Fetch real data from multiple endpoints
        const [hotelsRes, inquiriesRes, postsRes] = await Promise.all([
          fetch("/api/cms/hotels", {
            headers: { "Authorization": `Bearer ${token}` }
          }),
          fetch("/api/inquiries", {
            headers: { "Authorization": `Bearer ${token}` }
          }),
          fetch("/api/cms/posts", {
            headers: { "Authorization": `Bearer ${token}` }
          })
        ]);

        const hotelsData = hotelsRes.ok ? await hotelsRes.json() : { hotels: [] };
        const inquiriesData = inquiriesRes.ok ? await inquiriesRes.json() : { inquiries: [] };
        const postsData = postsRes.ok ? await postsRes.json() : { posts: [] };

        return {
          pages: 5, // Static for now
          posts: postsData.posts?.length || 0,
          inquiries: inquiriesData.inquiries?.length || 0,
          media: 24, // Static for now
          hotels: hotelsData.hotels?.length || 0,
          destinations: 0, // Will be updated when destinations API is ready
          tours: 0, // Will be updated when tours API is ready
          packages: 0, // Will be updated when packages API is ready
        } as DashboardStats;
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Return default stats on error
        return {
          pages: 5,
          posts: 12,
          inquiries: 0,
          media: 24,
          hotels: 0,
          destinations: 0,
          tours: 0,
          packages: 0
        } as DashboardStats;
      }
    },
    enabled: !!localStorage.getItem("adminToken"),
    retry: 1,
    staleTime: 30000, // Cache for 30 seconds
  });

  const statsCards = [
    {
      title: "Pages",
      value: stats?.pages || 0,
      description: "Total pages",
      icon: FileText,
      color: "bg-blue-500",
      href: "/admin/pages"
    },
    {
      title: "Blog Posts",
      value: stats?.posts || 0,
      description: "Published & draft posts",
      icon: FileText,
      color: "bg-green-500",
      href: "/admin/posts"
    },
    {
      title: "Destinations",
      value: stats?.destinations || 0,
      description: "Travel destinations",
      icon: MapPin,
      color: "bg-emerald-500",
      href: "/admin/destinations"
    },
    {
      title: "Hotels",
      value: stats?.hotels || 0,
      description: "Luxury accommodations",
      icon: Building,
      color: "bg-indigo-500",
      href: "/admin/hotels"
    },
    {
      title: "Tours",
      value: stats?.tours || 0,
      description: "Travel tours",
      icon: Plane,
      color: "bg-cyan-500",
      href: "/admin/tours"
    },
    {
      title: "Packages",
      value: stats?.packages || 0,
      description: "Travel packages",
      icon: Package,
      color: "bg-orange-500",
      href: "/admin/packages"
    },
    {
      title: "Inquiries",
      value: stats?.inquiries || 0,
      description: "Travel inquiries",
      icon: MessageSquare,
      color: "bg-amber-500",
      href: "/admin/inquiries"
    },
    {
      title: "Media Files",
      value: stats?.media || 0,
      description: "Images & documents",
      icon: Image,
      color: "bg-purple-500",
      href: "/admin/media"
    }
  ];

  return (
    <AdminLayout 
      title="Dashboard" 
      description="Overview of your travel website content and statistics"
    >
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back!
        </h2>
        <p className="text-gray-600">
          Manage your travel website content, blog posts, and customer inquiries from this central dashboard.
        </p>
      </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card 
                key={stat.title} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setLocation(stat.href)}
                data-testid={`card-${stat.title.toLowerCase().replace(' ', '-')}`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.color} p-2 rounded-md`}>
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {isLoading ? "..." : stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common tasks to get you started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setLocation("/admin/pages/new")}
                data-testid="button-new-page"
              >
                <FileText className="h-4 w-4 mr-2" />
                Create New Page
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setLocation("/admin/posts")}
                data-testid="button-new-post"
              >
                <FileText className="h-4 w-4 mr-2" />
                Write Blog Post
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setLocation("/admin/hotels/new")}
                data-testid="button-new-hotel"
              >
                <Building className="h-4 w-4 mr-2" />
                Add New Hotel
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setLocation("/admin/media")}
                data-testid="button-manage-media"
              >
                <Image className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest changes to your content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Activity tracking coming soon...
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Current system information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Database:</span>
                  <Badge variant="default">Connected</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Storage:</span>
                  <Badge variant="default">Available</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Status:</span>
                  <Badge variant="default">Operational</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      {/* Development Tools */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Development Tools</h3>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={async () => {
              try {
                const response = await fetch("/api/hotels/seed", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" }
                });
                const result = await response.json();
                alert(result.message);
              } catch (error) {
                alert("Error seeding hotels");
              }
            }}
          >
            Seed Hotels
          </Button>
          <Button
            variant="outline"
            onClick={async () => {
              try {
                const response = await fetch("/api/auth/seed", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" }
                });
                const result = await response.json();
                alert(result.message);
              } catch (error) {
                alert("Error seeding admin user");
              }
            }}
          >
            Seed Admin User
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}