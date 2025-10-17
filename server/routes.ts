import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import { storage } from "./storage";
import { 
  insertInquirySchema, 
  insertUserSchema,
  insertPageSchema,
  insertPostSchema,
  insertHotelSchema,
  insertMediaSchema,
  loginSchema
} from "@shared/schema";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { 
  hashPassword, 
  verifyPassword, 
  generateToken, 
  requireAuth, 
  requireAdmin, 
  requireEditor,
  type AuthenticatedRequest
} from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes for I.LuxuryEgypt inquiry form
  
  // Submit inquiry form
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      
      // Log the inquiry for demonstration purposes
      console.log("New luxury travel inquiry received:", {
        name: inquiry.fullName,
        email: inquiry.email,
        destination: inquiry.destination,
        dates: inquiry.preferredDates,
      });
      
      res.status(201).json({
        success: true,
        message: "Thank you for your inquiry! Our luxury travel specialists will contact you within 24 hours to craft your bespoke Egyptian journey.",
        inquiry: {
          id: inquiry.id,
          fullName: inquiry.fullName,
          email: inquiry.email,
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Please check your form data",
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      } else {
        console.error("Error creating inquiry:", error);
        res.status(500).json({
          success: false,
          message: "We apologize, but there was an error processing your inquiry. Please try again or contact us directly."
        });
      }
    }
  });

  // Public tours route (no authentication required)
  app.get("/api/public/tours", async (req, res) => {
    try {
      const { category } = req.query;
      const allTours = await storage.getTours();
      
      // Filter by category if provided
      const tours = category 
        ? allTours.filter(tour => tour.category === category)
        : allTours;
      
      res.json({ success: true, tours });
    } catch (error) {
      console.error('Error fetching tours:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error fetching tours' 
      });
    }
  });

  // Authentication Routes
  
  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      // Find user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Verify password
      const isValidPassword = await verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Generate token
      const token = generateToken(user);
      
      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid input data' });
      }
      
      // Check if it's a database connection error
      if (error instanceof Error && error.message && error.message.includes('map')) {
        return res.status(503).json({ 
          message: 'Database not initialized. Please contact administrator.',
          hint: 'Try calling /api/init-db first'
        });
      }
      
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Register (admin only)
  app.post("/api/auth/register", requireAuth, requireAdmin, async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      
      // Hash password
      const hashedPassword = await hashPassword(userData.password);
      
      // Create user
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });
      
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Invalid input data',
          errors: error.errors
        });
      }
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Verify token
  app.get("/api/auth/verify", requireAuth, async (req, res) => {
    const authReq = req as AuthenticatedRequest;
    res.json({
      success: true,
      user: {
        id: authReq.user!.id,
        username: authReq.user!.username,
        email: authReq.user!.email,
        role: authReq.user!.role
      }
    });
  });
  
  // Initialize database tables and seed data (DEVELOPMENT ONLY)
  app.post("/api/init-db", async (req, res) => {
    // Only allow in development environment
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({
        success: false,
        message: "Database initialization is only allowed in development mode"
      });
    }
    
    try {
      // First try to seed admin user and hotels via existing endpoint
      const seedResponse = await fetch('http://localhost:5000/api/auth/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const hotelSeedResponse = await fetch('http://localhost:5000/api/hotels/seed', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }
      });
      
      res.json({
        success: true,
        message: "Database initialized successfully",
        details: {
          admin: await seedResponse.json(),
          hotels: await hotelSeedResponse.json()
        }
      });
    } catch (error) {
      console.error('Database initialization error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error initializing database',
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });

  // Seed default admin user (DEVELOPMENT ONLY)
  app.post("/api/auth/seed", async (req, res) => {
    // Only allow in development environment
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({
        success: false,
        message: "Admin seeding is only allowed in development mode"
      });
    }
    
    try {
      // Check if admin already exists
      const existingAdmin = await storage.getUserByUsername("admin");
      if (existingAdmin) {
        return res.json({
          success: true,
          message: "Admin user already exists"
        });
      }
      
      // Create default admin user
      const hashedPassword = await hashPassword("admin123");
      const adminUser = await storage.createUser({
        username: "admin",
        email: "admin@luxortravel.com",
        password: hashedPassword,
        role: "admin"
      });
      
      res.json({
        success: true,
        message: "Default admin user created successfully",
        credentials: {
          username: "admin",
          password: "admin123"
        }
      });
    } catch (error) {
      console.error('Error seeding admin user:', error);
      res.status(500).json({ message: 'Error creating admin user' });
    }
  });

  // Seed hotels (DEVELOPMENT ONLY)
  app.post("/api/hotels/seed", async (req, res) => {
    // Only allow in development environment
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({
        success: false,
        message: "Hotel seeding is only allowed in development mode"
      });
    }
    
    try {
      // Check if hotels already exist
      const existingHotels = await storage.getHotels();
      if (existingHotels.length > 0) {
        return res.json({
          success: true,
          message: "Hotels already exist in database",
          count: existingHotels.length
        });
      }
      
      // Create default admin user if it doesn't exist
      let adminUser = await storage.getUserByUsername("admin");
      if (!adminUser) {
        const hashedPassword = await hashPassword("admin123");
        adminUser = await storage.createUser({
          username: "admin",
          email: "admin@luxortravel.com",
          password: hashedPassword,
          role: "admin"
        });
      }
      
      // Hotel data to seed
      const hotelsToSeed = [
        {
          id: "mena-house",
          name: "Mena House Hotel",
          location: "Giza",
          region: "Cairo & Giza",
          type: "Palace",
          rating: 5,
          priceTier: "$$$$",
          amenities: ["Pyramid Views", "Historic Heritage", "Luxury Spa", "Fine Dining"],
          image: "/api/assets/the-pyramid-from-mena-house_1757459228638.jpeg",
          description: "Historic palace hotel with direct views of the Great Pyramids. A legendary retreat where royalty and celebrities have stayed for over a century.",
          featured: true,
          createdBy: adminUser.id
        },
        {
          id: "sofitel-winter-palace",
          name: "Sofitel Winter Palace",
          location: "Luxor",
          region: "Luxor",
          type: "Palace",
          rating: 5,
          priceTier: "$$$$",
          amenities: ["Nile Gardens", "Royal Heritage", "Pool Complex", "Historic Charm"],
          image: "/api/assets/luxor_1757531163688.jpg",
          description: "Victorian grandeur on the banks of the Nile. This legendary hotel has hosted dignitaries and explorers since 1886.",
          featured: true,
          createdBy: adminUser.id
        },
        {
          id: "adrere-amellal",
          name: "Adrère Amellal",
          location: "Siwa Oasis",
          region: "Siwa",
          type: "Eco-Lodge",
          rating: 4,
          priceTier: "$$$",
          amenities: ["Eco-Friendly", "Desert Views", "Natural Architecture", "Wellness"],
          image: "/api/assets/siwa_1757531163689.jpg",
          description: "Eco-luxury desert lodge built entirely from natural materials. Experience the serene beauty of the Sahara in sustainable comfort.",
          featured: true,
          createdBy: adminUser.id
        },
        {
          id: "four-seasons-nile-plaza",
          name: "Four Seasons Hotel Cairo at Nile Plaza",
          location: "Cairo",
          region: "Cairo & Giza",
          type: "Resort",
          rating: 5,
          priceTier: "$$$$",
          amenities: ["Nile Views", "Luxury Spa", "Fine Dining", "Business Center"],
          image: "/api/assets/suite-nile_1757457083796.jpg",
          description: "Modern luxury with panoramic Nile views in the heart of Cairo. Contemporary elegance meets Egyptian hospitality.",
          featured: true,
          createdBy: adminUser.id
        }
      ];
      
      // Create hotels
      const createdHotels = [];
      for (const hotelData of hotelsToSeed) {
        const { id, ...hotelWithoutId } = hotelData;
        const hotel = await storage.createHotel(hotelWithoutId);
        createdHotels.push(hotel);
      }
      
      res.json({
        success: true,
        message: "Hotels seeded successfully",
        count: createdHotels.length,
        hotels: createdHotels
      });
    } catch (error) {
      console.error('Error seeding hotels:', error);
      res.status(500).json({ message: 'Error seeding hotels' });
    }
  });
  
  // CMS Routes
  
  // Pages
  app.get("/api/cms/pages", requireAuth, requireEditor, async (req, res) => {
    try {
      const pages = await storage.getPages();
      res.json({ success: true, pages });
    } catch (error) {
      console.error('Error fetching pages:', error);
      res.status(500).json({ message: 'Error fetching pages' });
    }
  });
  
  app.post("/api/cms/pages", requireAuth, requireEditor, async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const pageData = insertPageSchema.parse(req.body);
      
      const page = await storage.createPage({
        ...pageData,
        createdBy: authReq.user!.id
      });
      
      res.status(201).json({ success: true, page });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Invalid input data',
          errors: error.errors
        });
      }
      console.error('Error creating page:', error);
      res.status(500).json({ message: 'Error creating page' });
    }
  });
  
  // Posts
  app.get("/api/cms/posts", requireAuth, requireEditor, async (req, res) => {
    try {
      const posts = await storage.getPosts();
      res.json({ success: true, posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Error fetching posts' });
    }
  });
  
  app.post("/api/cms/posts", requireAuth, requireEditor, async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const postData = insertPostSchema.parse(req.body);
      
      const post = await storage.createPost({
        ...postData,
        createdBy: authReq.user!.id
      });
      
      res.status(201).json({ success: true, post });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Invalid input data',
          errors: error.errors
        });
      }
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Error creating post' });
    }
  });

  // Get specific post by ID
  app.get("/api/cms/posts/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const post = await storage.getPost(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json({ success: true, post });
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ message: 'Error fetching post' });
    }
  });

  // Update post
  app.put("/api/cms/posts/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const postData = insertPostSchema.partial().parse(req.body);
      
      const post = await storage.updatePost(req.params.id, postData);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      res.json({ success: true, post });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Invalid input data',
          errors: error.errors
        });
      }
      console.error('Error updating post:', error);
      res.status(500).json({ message: 'Error updating post' });
    }
  });

  // Delete post
  app.delete("/api/cms/posts/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const deleted = await storage.deletePost(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      res.json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ message: 'Error deleting post' });
    }
  });

  // Hotels Management Routes
  
  // Get all hotels (public access)
  app.get("/api/hotels", async (req, res) => {
    try {
      const hotels = await storage.getHotels();
      res.json({ success: true, hotels });
    } catch (error) {
      console.error('Error fetching hotels:', error);
      res.status(500).json({ message: 'Error fetching hotels' });
    }
  });

  // Get a specific hotel (public access)
  app.get("/api/hotels/:id", async (req, res) => {
    try {
      const hotel = await storage.getHotel(req.params.id);
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
      res.json({ success: true, hotel });
    } catch (error) {
      console.error('Error fetching hotel:', error);
      res.status(500).json({ message: 'Error fetching hotel' });
    }
  });

  // Create hotel (admin/editor access)
  app.post("/api/cms/hotels", requireAuth, requireEditor, async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const hotelData = insertHotelSchema.parse(req.body);
      
      const hotel = await storage.createHotel({
        ...hotelData,
        createdBy: authReq.user!.id
      });
      
      res.status(201).json({ success: true, hotel });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Invalid input data',
          errors: error.errors
        });
      }
      console.error('Error creating hotel:', error);
      res.status(500).json({ message: 'Error creating hotel' });
    }
  });

  // Update hotel (admin/editor access)
  app.put("/api/cms/hotels/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const hotelData = insertHotelSchema.partial().parse(req.body);
      
      const hotel = await storage.updateHotel(req.params.id, hotelData);
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
      
      res.json({ success: true, hotel });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Invalid input data',
          errors: error.errors
        });
      }
      console.error('Error updating hotel:', error);
      res.status(500).json({ message: 'Error updating hotel' });
    }
  });

  // Delete hotel (admin/editor access)
  app.delete("/api/cms/hotels/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const deleted = await storage.deleteHotel(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Hotel not found' });
      }
      
      res.json({ success: true, message: 'Hotel deleted successfully' });
    } catch (error) {
      console.error('Error deleting hotel:', error);
      res.status(500).json({ message: 'Error deleting hotel' });
    }
  });

  // Get hotels for CMS management (admin/editor access)
  app.get("/api/cms/hotels", requireAuth, requireEditor, async (req, res) => {
    try {
      const hotels = await storage.getHotels();
      res.json({ success: true, hotels });
    } catch (error) {
      console.error('Error fetching hotels for CMS:', error);
      res.status(500).json({ message: 'Error fetching hotels' });
    }
  });

  // Dashboard stats endpoint
  app.get("/api/cms/stats", requireAuth, requireEditor, async (req, res) => {
    try {
      const [hotels, inquiries, pages, posts] = await Promise.all([
        storage.getHotels(),
        storage.getInquiries(),
        storage.getPages(),
        storage.getPosts()
      ]);

      res.json({
        success: true,
        stats: {
          hotels: hotels.length,
          inquiries: inquiries.length,
          pages: pages.length,
          posts: posts.length,
          media: 24 // Static for now
        }
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      res.status(500).json({ message: 'Error fetching dashboard stats' });
    }
  });
  
  // Get all inquiries (for admin purposes)
  app.get("/api/inquiries", requireAuth, requireEditor, async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json({
        success: true,
        inquiries
      });
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching inquiries"
      });
    }
  });

  // Get specific inquiry
  app.get("/api/inquiries/:id", async (req, res) => {
    try {
      const inquiry = await storage.getInquiry(req.params.id);
      if (!inquiry) {
        res.status(404).json({
          success: false,
          message: "Inquiry not found"
        });
        return;
      }
      
      res.json({
        success: true,
        inquiry
      });
    } catch (error) {
      console.error("Error fetching inquiry:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching inquiry"
      });
    }
  });

  // Configure multer for file uploads
  const storage_config = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.resolve(import.meta.dirname, "..", "attached_assets", "uploads");
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      const filename = `${uuidv4()}${fileExtension}`;
      cb(null, filename);
    }
  });

  const upload = multer({ 
    storage: storage_config,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
      // Allow images and documents
      const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only images and documents are allowed!'));
      }
    }
  });

  // Media Management Routes
  
  // Get all media files
  app.get("/api/cms/media", requireAuth, requireEditor, async (req, res) => {
    try {
      const media = await storage.getMedia();
      res.json({ success: true, media });
    } catch (error) {
      console.error('Error fetching media:', error);
      res.status(500).json({ message: 'Error fetching media' });
    }
  });

  // Get specific media file
  app.get("/api/cms/media/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const media = await storage.getMediaById(req.params.id);
      if (!media) {
        return res.status(404).json({ message: 'Media not found' });
      }
      res.json({ success: true, media });
    } catch (error) {
      console.error('Error fetching media:', error);
      res.status(500).json({ message: 'Error fetching media' });
    }
  });

  // Upload media file
  app.post("/api/cms/media", requireAuth, requireEditor, upload.single('file'), async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;
      
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const mediaData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: `/api/assets/uploads/${req.file.filename}`,
        uploadedBy: authReq.user!.id
      };

      const media = await storage.createMedia(mediaData);
      res.status(201).json({ success: true, media });
    } catch (error) {
      console.error('Error uploading media:', error);
      res.status(500).json({ message: 'Error uploading media' });
    }
  });

  // Delete media file
  app.delete("/api/cms/media/:id", requireAuth, requireEditor, async (req, res) => {
    try {
      const media = await storage.getMediaById(req.params.id);
      if (!media) {
        return res.status(404).json({ message: 'Media not found' });
      }

      const success = await storage.deleteMedia(req.params.id);
      if (success) {
        // Also delete the actual file
        try {
          const filePath = path.resolve(import.meta.dirname, "..", "attached_assets", "uploads", media.filename);
          await import('fs').then(fs => fs.promises.unlink(filePath));
        } catch (fileError) {
          console.warn('Could not delete file from disk:', fileError);
        }
        
        res.json({ success: true, message: 'Media deleted successfully' });
      } else {
        res.status(500).json({ message: 'Error deleting media' });
      }
    } catch (error) {
      console.error('Error deleting media:', error);
      res.status(500).json({ message: 'Error deleting media' });
    }
  });

  // Serve assets from attached_assets folder
  app.use("/api/assets", express.static(path.resolve(import.meta.dirname, "..", "attached_assets")));

  const httpServer = createServer(app);

  return httpServer;
}
