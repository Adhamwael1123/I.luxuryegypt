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
import { Switch } from "@/components/ui/switch";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building, Plus, Edit, Search, Trash2, Star, MapPin } from "lucide-react";
import AdminLayout from "@/components/admin-layout";
import { insertHotelSchema } from "@shared/schema";

const hotelFormSchema = insertHotelSchema.extend({
  name: z.string().min(1, "Hotel name is required"),
  location: z.string().min(1, "Location is required"),
  region: z.string().min(1, "Region is required"),
  type: z.string().min(1, "Hotel type is required"),
  rating: z.coerce.number().min(1).max(5, "Rating must be between 1 and 5"),
  priceTier: z.string().min(1, "Price tier is required"),
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
  image: z.string().min(1, "Image URL is required"),
  description: z.string().min(1, "Description is required"),
  featured: z.boolean().default(false),
});

type HotelFormData = z.infer<typeof hotelFormSchema>;

interface Hotel {
  id: string;
  name: string;
  location: string;
  region: string;
  type: string;
  rating: number;
  priceTier: string;
  amenities: string[];
  image: string;
  description: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminHotels() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingHotel, setDeletingHotel] = useState<Hotel | null>(null);
  const { toast } = useToast();

  const { data: hotelsResponse, isLoading } = useQuery({
    queryKey: ["/api/cms/hotels"],
    enabled: true
  });

  const hotels = (hotelsResponse as any)?.hotels || [];

  const createHotelMutation = useMutation({
    mutationFn: async (data: HotelFormData) => {
      return apiRequest('POST', '/api/cms/hotels', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/hotels"] });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/stats"] });
      setIsCreateDialogOpen(false);
      createForm.reset();
      toast({ title: "Hotel created successfully!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error creating hotel", 
        description: error.message || "Something went wrong",
        variant: "destructive" 
      });
    },
  });

  const updateHotelMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<HotelFormData> }) => {
      return apiRequest('PUT', `/api/cms/hotels/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/hotels"] });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/stats"] });
      setIsEditDialogOpen(false);
      setEditingHotel(null);
      toast({ title: "Hotel updated successfully!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error updating hotel", 
        description: error.message || "Something went wrong",
        variant: "destructive" 
      });
    },
  });

  const deleteHotelMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/cms/hotels/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms/hotels"] });
      queryClient.invalidateQueries({ queryKey: ["/api/cms/stats"] });
      setIsDeleteDialogOpen(false);
      setDeletingHotel(null);
      toast({ title: "Hotel deleted successfully!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Error deleting hotel", 
        description: error.message || "Something went wrong",
        variant: "destructive" 
      });
    },
  });

  const createForm = useForm<HotelFormData>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: {
      name: "",
      location: "",
      region: "",
      type: "",
      rating: 5,
      priceTier: "",
      amenities: [],
      image: "",
      description: "",
      featured: false,
    },
  });

  const editForm = useForm<HotelFormData>({
    resolver: zodResolver(hotelFormSchema),
  });

  useEffect(() => {
    if (editingHotel) {
      editForm.reset({
        name: editingHotel.name || "",
        location: editingHotel.location || "",
        region: editingHotel.region || "",
        type: editingHotel.type || "",
        rating: editingHotel.rating || 5,
        priceTier: editingHotel.priceTier || "",
        amenities: editingHotel.amenities || [],
        image: editingHotel.image || "",
        description: editingHotel.description || "",
        featured: editingHotel.featured || false,
      });
    }
  }, [editingHotel, editForm]);

  const onCreateSubmit = (data: HotelFormData) => {
    createHotelMutation.mutate(data);
  };

  const onEditSubmit = (data: HotelFormData) => {
    if (editingHotel) {
      updateHotelMutation.mutate({ id: editingHotel.id, data });
    }
  };

  const handleEdit = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (hotel: Hotel) => {
    setDeletingHotel(hotel);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deletingHotel) {
      deleteHotelMutation.mutate(deletingHotel.id);
    }
  };

  const filteredHotels = hotels.filter((hotel: Hotel) =>
    hotel.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.region?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  const HotelFormFields = ({ form, isEdit = false }: { form: any; isEdit?: boolean }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hotel Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Mena House Hotel" {...field} data-testid={isEdit ? "edit-input-name" : "input-name"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hotel Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger data-testid={isEdit ? "edit-select-type" : "select-type"}>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Palace">Palace</SelectItem>
                  <SelectItem value="Resort">Resort</SelectItem>
                  <SelectItem value="Boutique">Boutique</SelectItem>
                  <SelectItem value="Luxury Hotel">Luxury Hotel</SelectItem>
                  <SelectItem value="Historic">Historic</SelectItem>
                  <SelectItem value="Eco Lodge">Eco Lodge</SelectItem>
                  <SelectItem value="Beach Resort">Beach Resort</SelectItem>
                  <SelectItem value="Desert Camp">Desert Camp</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Giza" {...field} data-testid={isEdit ? "edit-input-location" : "input-location"} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger data-testid={isEdit ? "edit-select-region" : "select-region"}>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Cairo & Giza">Cairo & Giza</SelectItem>
                  <SelectItem value="Luxor">Luxor</SelectItem>
                  <SelectItem value="Aswan">Aswan</SelectItem>
                  <SelectItem value="Alexandria">Alexandria</SelectItem>
                  <SelectItem value="Red Sea">Red Sea</SelectItem>
                  <SelectItem value="Sinai">Sinai</SelectItem>
                  <SelectItem value="Siwa Oasis">Siwa Oasis</SelectItem>
                  <SelectItem value="Western Desert">Western Desert</SelectItem>
                  <SelectItem value="Nile Cruise">Nile Cruise</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Star Rating</FormLabel>
              <Select onValueChange={(val) => field.onChange(parseInt(val))} value={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger data-testid={isEdit ? "edit-select-rating" : "select-rating"}>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priceTier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Tier</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger data-testid={isEdit ? "edit-select-price" : "select-price"}>
                    <SelectValue placeholder="Select price tier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="$">$ - Budget</SelectItem>
                  <SelectItem value="$$">$$ - Moderate</SelectItem>
                  <SelectItem value="$$$">$$$ - Upscale</SelectItem>
                  <SelectItem value="$$$$">$$$$ - Luxury</SelectItem>
                  <SelectItem value="$$$$$">$$$$$ - Ultra Luxury</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the hotel, its history, and unique features..." 
                rows={4} 
                {...field} 
                data-testid={isEdit ? "edit-textarea-description" : "textarea-description"} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image URL</FormLabel>
            <FormControl>
              <Input placeholder="https://example.com/hotel-image.jpg" {...field} data-testid={isEdit ? "edit-input-image" : "input-image"} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="amenities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Amenities (comma-separated)</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., Spa, Pool, Fine Dining, Pyramid Views" 
                value={field.value?.join(', ') || ''}
                onChange={(e) => {
                  const amenities = e.target.value.split(',').map(a => a.trim()).filter(Boolean);
                  field.onChange(amenities);
                }}
                data-testid={isEdit ? "edit-input-amenities" : "input-amenities"} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="featured"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Featured Hotel</FormLabel>
              <div className="text-sm text-muted-foreground">
                Display this hotel prominently on the website
              </div>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                data-testid={isEdit ? "edit-switch-featured" : "switch-featured"}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );

  return (
    <AdminLayout title="Hotels" description="Manage luxury accommodations">
      <div className="mb-6 flex justify-end">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-new-hotel">
              <Plus className="h-4 w-4 mr-2" />
              Add New Hotel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Hotel</DialogTitle>
              <DialogDescription>
                Add a new luxury hotel to your portfolio.
              </DialogDescription>
            </DialogHeader>
            <Form {...createForm}>
              <form onSubmit={createForm.handleSubmit(onCreateSubmit)} className="space-y-4">
                <HotelFormFields form={createForm} />
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
                    disabled={createHotelMutation.isPending}
                    data-testid="button-create"
                  >
                    {createHotelMutation.isPending ? "Creating..." : "Create Hotel"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Hotels ({hotels.length})
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search hotels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                data-testid="input-search"
              />
            </div>
          </CardTitle>
          <CardDescription>
            Manage your luxury hotel portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading hotels...</p>
            </div>
          ) : filteredHotels.length === 0 ? (
            <div className="text-center py-8">
              <Building className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">
                {hotels.length === 0 ? "No hotels yet" : "No hotels match your search"}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {hotels.length === 0 
                  ? "Get started by adding your first hotel." 
                  : "Try adjusting your search terms."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHotels.map((hotel: Hotel) => (
                <div 
                  key={hotel.id} 
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  data-testid={`hotel-${hotel.id}`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-4 flex-1">
                      {hotel.image && (
                        <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                          <img 
                            src={hotel.image} 
                            alt={hotel.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-medium" data-testid={`text-name-${hotel.id}`}>
                            {hotel.name}
                          </h3>
                          <div className="flex items-center">
                            {renderStars(hotel.rating)}
                          </div>
                          {hotel.featured && (
                            <Badge variant="default" data-testid={`badge-featured-${hotel.id}`}>
                              Featured
                            </Badge>
                          )}
                          <Badge variant="secondary" data-testid={`badge-type-${hotel.id}`}>
                            {hotel.type}
                          </Badge>
                          <Badge variant="outline" data-testid={`badge-price-${hotel.id}`}>
                            {hotel.priceTier}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span data-testid={`text-location-${hotel.id}`}>
                            {hotel.location}, {hotel.region}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2" data-testid={`text-description-${hotel.id}`}>
                          {hotel.description}
                        </p>
                        {hotel.amenities && hotel.amenities.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                            {hotel.amenities.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{hotel.amenities.length - 4} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(hotel)}
                        data-testid={`button-edit-${hotel.id}`}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(hotel)}
                        className="text-destructive hover:text-destructive"
                        data-testid={`button-delete-${hotel.id}`}
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Hotel</DialogTitle>
            <DialogDescription>
              Update hotel information.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <HotelFormFields form={editForm} isEdit={true} />
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setEditingHotel(null);
                  }}
                  data-testid="edit-button-cancel"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={updateHotelMutation.isPending}
                  data-testid="edit-button-save"
                >
                  {updateHotelMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Hotel</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingHotel?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsDeleteDialogOpen(false);
                setDeletingHotel(null);
              }}
              data-testid="delete-button-cancel"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteHotelMutation.isPending}
              data-testid="delete-button-confirm"
            >
              {deleteHotelMutation.isPending ? "Deleting..." : "Delete Hotel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
