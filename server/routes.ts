import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertInquirySchema, 
  insertUserSchema,
  insertPageSchema,
  insertPostSchema,
  insertHotelSchema,
  loginSchema
} from "@shared/schema";
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

  const httpServer = createServer(app);

  return httpServer;
}
