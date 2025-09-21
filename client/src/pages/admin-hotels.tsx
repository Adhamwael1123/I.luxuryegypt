
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { Building, Plus, Edit, Trash2, Search, ArrowLeft } from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  location: string;
  region: string;
  type: string;
  rating: number;
  priceTier: string;
  amenities: string[];
  description: string;
  featured: boolean;
  createdAt: string;
}

export default function AdminHotels() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const { data: hotels, isLoading } = useQuery({
    queryKey: ["/api/cms/hotels"],
    queryFn: async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("No auth token");
      
      const response = await fetch("/api/cms/hotels", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    },
    enabled: !!localStorage.getItem("adminToken"),
  });

  const deleteHotelMutation = useMutation({
    mutationFn: async (hotelId: string) => {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("No auth token");
      
      const response = await fetch(`/api/cms/hotels/${hotelId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/hotels"] });
    },
  });

  const filteredHotels = hotels?.hotels?.filter((hotel: Hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDeleteHotel = (hotelId: string) => {
    if (confirm("Are you sure you want to delete this hotel?")) {
      deleteHotelMutation.mutate(hotelId);
    }
  };

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
                <h1 className="text-xl font-semibold text-gray-900">Hotels Management</h1>
                <p className="text-sm text-gray-500">Manage luxury accommodations</p>
              </div>
            </div>
            <Button onClick={() => setLocation("/admin/hotels/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Hotel
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search hotels by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Hotels Grid */}
        {isLoading ? (
          <div className="text-center py-8">Loading hotels...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel: Hotel) => (
              <Card key={hotel.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{hotel.name}</CardTitle>
                      <CardDescription>
                        {hotel.location}, {hotel.region}
                      </CardDescription>
                    </div>
                    <Badge variant={hotel.featured ? "default" : "secondary"}>
                      {hotel.featured ? "Featured" : "Standard"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Type:</span>
                      <span className="font-medium">{hotel.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Rating:</span>
                      <span className="font-medium">{hotel.rating} stars</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Price Tier:</span>
                      <span className="font-medium">{hotel.priceTier}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {hotel.description}
                    </p>
                    <div className="flex justify-between pt-4 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setLocation(`/admin/hotels/${hotel.id}/edit`)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteHotel(hotel.id)}
                        disabled={deleteHotelMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredHotels.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Building className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hotels found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? "Try adjusting your search terms." : "Get started by adding a new hotel."}
            </p>
            <div className="mt-6">
              <Button onClick={() => setLocation("/admin/hotels/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Hotel
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
