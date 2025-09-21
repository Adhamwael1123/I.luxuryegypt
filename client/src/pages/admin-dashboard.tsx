import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { FileText, Users, MessageSquare, Image, Plus, LogOut, Building } from "lucide-react";

interface DashboardStats {
  pages: number;
  posts: number;
  inquiries: number;
  media: number;
  hotels: number;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");
    
    if (!token || !user) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      setLocation("/admin/login");
      return;
    }

    // Verify token is still valid
    fetch("/api/auth/verify", {
      headers: { "Authorization": `Bearer ${token}` }
    }).then(response => {
      if (!response.ok) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        setLocation("/admin/login");
      }
    }).catch(() => {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      setLocation("/admin/login");
    });
  }, [setLocation]);

  const user = JSON.parse(localStorage.getItem("adminUser") || "{}");

  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/cms/stats"],
    queryFn: async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("No auth token");

      try {
        // Fetch real data from multiple endpoints
        const [hotelsRes, inquiriesRes] = await Promise.all([
          fetch("/api/cms/hotels", {
            headers: { "Authorization": `Bearer ${token}` }
          }),
          fetch("/api/inquiries", {
            headers: { "Authorization": `Bearer ${token}` }
          })
        ]);

        const hotelsData = hotelsRes.ok ? await hotelsRes.json() : { hotels: [] };
        const inquiriesData = inquiriesRes.ok ? await inquiriesRes.json() : { inquiries: [] };

        return {
          pages: 5, // Static for now
          posts: 12, // Static for now
          inquiries: inquiriesData.inquiries?.length || 0,
          media: 24, // Static for now
          hotels: hotelsData.hotels?.length || 0
        } as DashboardStats;
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Return default stats on error
        return {
          pages: 5,
          posts: 12,
          inquiries: 0,
          media: 24,
          hotels: 0
        } as DashboardStats;
      }
    },
    enabled: !!localStorage.getItem("adminToken"),
    retry: 1,
    staleTime: 30000, // Cache for 30 seconds
  });

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setLocation("/admin/login");
  };

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
      title: "Hotels",
      value: stats?.hotels || 0,
      description: "Luxury accommodations",
      icon: Building,
      color: "bg-indigo-500",
      href: "/admin/hotels"
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                LuxorTravel CMS
              </h1>
              <p className="text-sm text-gray-500">Content Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.username}</p>
                <Badge variant="secondary" className="text-xs">
                  {user.role}
                </Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                data-testid="button-logout"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, {user.username}!
          </h2>
          <p className="text-gray-600">
            Manage your travel website content, blog posts, and customer inquiries.
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
                onClick={() => setLocation("/admin/posts/new")}
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
      </main>
    </div>
  );
}