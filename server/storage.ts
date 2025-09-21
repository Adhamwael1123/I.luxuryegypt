import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  type User, type InsertUser, type Inquiry, type InsertInquiry,
  type Page, type InsertPage, type Section, type InsertSection,
  type Post, type InsertPost, type Media, type InsertMedia,
  type Hotel, type InsertHotel,
  users, inquiries, pages, sections, posts, media as mediaTable, hotels
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

// Database connection with pooled connection for better SSL handling
const connectionString = process.env.DATABASE_URL!;
// Use pooled connection URL if available
const pooledUrl = connectionString.includes('.us-east-2')
  ? connectionString.replace('.us-east-2', '-pooler.us-east-2')
  : connectionString;

const sql = neon(pooledUrl);
const db = drizzle(sql);

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Inquiry methods
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  getInquiry(id: string): Promise<Inquiry | undefined>;
  deleteInquiry(id: string): Promise<boolean>;

  // Page methods
  createPage(page: InsertPage): Promise<Page>;
  getPages(): Promise<Page[]>;
  getPage(id: string): Promise<Page | undefined>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  updatePage(id: string, page: Partial<InsertPage>): Promise<Page | undefined>;
  deletePage(id: string): Promise<boolean>;

  // Section methods
  createSection(section: InsertSection): Promise<Section>;
  getSectionsByPageId(pageId: string): Promise<Section[]>;
  updateSection(id: string, section: Partial<InsertSection>): Promise<Section | undefined>;
  deleteSection(id: string): Promise<boolean>;

  // Post methods
  createPost(post: InsertPost): Promise<Post>;
  getPosts(): Promise<Post[]>;
  getPost(id: string): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  updatePost(id: string, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: string): Promise<boolean>;

  // Media methods
  createMedia(media: InsertMedia): Promise<Media>;
  getMedia(): Promise<Media[]>;
  getMediaById(id: string): Promise<Media | undefined>;
  deleteMedia(id: string): Promise<boolean>;

  // Hotel methods
  createHotel(hotel: InsertHotel): Promise<Hotel>;
  getHotels(): Promise<Hotel[]>;
  getHotel(id: string): Promise<Hotel | undefined>;
  updateHotel(id: string, hotel: Partial<InsertHotel>): Promise<Hotel | undefined>;
  deleteHotel(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0] || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0] || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Inquiry methods
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const result = await db.insert(inquiries).values(insertInquiry).returning();
    return result[0];
  }

  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }

  async getInquiry(id: string): Promise<Inquiry | undefined> {
    const result = await db.select().from(inquiries).where(eq(inquiries.id, id)).limit(1);
    return result[0] || undefined;
  }

  // Page methods
  async createPage(page: InsertPage): Promise<Page> {
    const result = await db.insert(pages).values(page).returning();
    return result[0];
  }

  async getPages(): Promise<Page[]> {
    return await db.select().from(pages).orderBy(desc(pages.createdAt));
  }

  async getPage(id: string): Promise<Page | undefined> {
    const result = await db.select().from(pages).where(eq(pages.id, id)).limit(1);
    return result[0] || undefined;
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const result = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1);
    return result[0] || undefined;
  }

  async updatePage(id: string, page: Partial<InsertPage>): Promise<Page | undefined> {
    const result = await db.update(pages).set({ ...page, updatedAt: new Date() }).where(eq(pages.id, id)).returning();
    return result[0] || undefined;
  }

  async deletePage(id: string): Promise<boolean> {
    const result = await db.delete(pages).where(eq(pages.id, id)).returning();
    return result.length > 0;
  }

  // Section methods
  async createSection(section: InsertSection): Promise<Section> {
    const result = await db.insert(sections).values(section).returning();
    return result[0];
  }

  async getSectionsByPageId(pageId: string): Promise<Section[]> {
    return await db.select().from(sections).where(eq(sections.pageId, pageId)).orderBy(sections.orderIndex);
  }

  async updateSection(id: string, section: Partial<InsertSection>): Promise<Section | undefined> {
    const result = await db.update(sections).set(section).where(eq(sections.id, id)).returning();
    return result[0] || undefined;
  }

  async deleteSection(id: string): Promise<boolean> {
    const result = await db.delete(sections).where(eq(sections.id, id)).returning();
    return result.length > 0;
  }

  // Post methods
  async createPost(post: InsertPost): Promise<Post> {
    const result = await db.insert(posts).values(post).returning();
    return result[0];
  }

  async getPosts(): Promise<Post[]> {
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async getPost(id: string): Promise<Post | undefined> {
    const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
    return result[0] || undefined;
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const result = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
    return result[0] || undefined;
  }

  async updatePost(id: string, post: Partial<InsertPost>): Promise<Post | undefined> {
    const result = await db.update(posts).set({ ...post, updatedAt: new Date() }).where(eq(posts.id, id)).returning();
    return result[0] || undefined;
  }

  async deletePost(id: string): Promise<boolean> {
    const result = await db.delete(posts).where(eq(posts.id, id)).returning();
    return result.length > 0;
  }

  // Media methods
  async createMedia(mediaData: InsertMedia): Promise<Media> {
    const result = await db.insert(mediaTable).values(mediaData).returning();
    return result[0];
  }

  async getMedia(): Promise<Media[]> {
    return await db.select().from(mediaTable).orderBy(desc(mediaTable.createdAt));
  }

  async getMediaById(id: string): Promise<Media | undefined> {
    const result = await db.select().from(mediaTable).where(eq(mediaTable.id, id)).limit(1);
    return result[0] || undefined;
  }

  async deleteMedia(id: string): Promise<boolean> {
    const result = await db.delete(mediaTable).where(eq(mediaTable.id, id)).returning();
    return result.length > 0;
  }

  // Delete inquiry
  async deleteInquiry(id: string): Promise<boolean> {
    try {
      const result = await db.delete(inquiries).where(eq(inquiries.id, id));
      return result.rowCount > 0;
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      return false;
    }
  }

  // Hotel methods
  async getHotels() {
    try {
      const hotelsList = await db.select().from(hotels).orderBy(hotels.createdAt);
      return hotelsList;
    } catch (error) {
      console.error("Error fetching hotels:", error);
      return [];
    }
  }

  async getHotel(id: string): Promise<Hotel | undefined> {
    try {
      const [hotel] = await db.select().from(hotels).where(eq(hotels.id, id));
      return hotel || undefined;
    } catch (error) {
      console.error("Error fetching hotel:", error);
      return undefined;
    }
  }

  async createHotel(data: InsertHotel & { createdBy: string }) {
    try {
      const [hotel] = await db.insert(hotels).values(data).returning();
      return hotel;
    } catch (error) {
      console.error("Error creating hotel:", error);
      throw error;
    }
  }

  async updateHotel(id: string, data: Partial<InsertHotel>) {
    try {
      const [hotel] = await db
        .update(hotels)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(hotels.id, id))
        .returning();
      return hotel || null;
    } catch (error) {
      console.error("Error updating hotel:", error);
      throw error;
    }
  }

  async deleteHotel(id: string): Promise<boolean> {
    try {
      const result = await db.delete(hotels).where(eq(hotels.id, id));
      return result.rowCount > 0;
    } catch (error) {
      console.error("Error deleting hotel:", error);
      return false;
    }
  }
}

// Memory Storage Implementation for Development
export class MemoryStorage implements IStorage {
  private users = new Map<string, User>();
  private inquiries = new Map<string, Inquiry>();
  private pages = new Map<string, Page>();
  private sections = new Map<string, Section>();
  private posts = new Map<string, Post>();
  private mediaFiles = new Map<string, Media>();
  private hotels = new Map<string, Hotel>();

  constructor() {
    // Pre-populate with default admin user
    this.seedDefaultUser();
    // Pre-populate with sample hotels
    this.seedDefaultHotels();
  }

  private async seedDefaultUser() {
    const defaultAdmin: User = {
      id: randomUUID(),
      username: "admin",
      email: "admin@luxortravel.com",
      password: "$2b$10$jya3D5zQkarnCNp7ex9E1eQFFdHa5pQgvriM2BK5yiPM/BNO77Hf.", // bcrypt hash of "admin123"
      role: "admin",
      createdAt: new Date()
    };

    this.users.set(defaultAdmin.id, defaultAdmin);
  }

  private async seedDefaultHotels() {
    // Seed with a few sample hotels from the original Stay page
    const sampleHotels: Hotel[] = [
      {
        id: randomUUID(),
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
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: null
      },
      {
        id: randomUUID(),
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
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: null
      },
      {
        id: randomUUID(),
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
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: null
      },
      {
        id: randomUUID(),
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
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: null
      },
      {
        id: randomUUID(),
        name: "Old Winter Palace Hotel",
        location: "Aswan",
        region: "Aswan",
        type: "Heritage",
        rating: 5,
        priceTier: "$$$$",
        amenities: ["Nile Views", "Historic Architecture", "Royal Gardens", "Fine Dining"],
        image: "/api/assets/suite-nile_1757457083796.jpg",
        description: "A legendary hotel on the banks of the Nile in Aswan, offering timeless elegance and unparalleled views.",
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: null
      }
    ];

    sampleHotels.forEach(hotel => {
      this.hotels.set(hotel.id, hotel);
    });

    // Add some sample inquiries
    const sampleInquiries: Inquiry[] = [
      {
        id: randomUUID(),
        fullName: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1-555-0123",
        destination: "Luxor & Aswan",
        preferredDates: "March 15-25, 2025",
        specialRequests: "Anniversary celebration, prefer Nile view rooms",
        createdAt: new Date(Date.now() - 86400000) // 1 day ago
      },
      {
        id: randomUUID(),
        fullName: "David Chen",
        email: "david.chen@email.com",
        phone: "+1-555-0456",
        destination: "Cairo & Giza",
        preferredDates: "April 10-20, 2025", 
        specialRequests: "Photography tour, need early pyramid access",
        createdAt: new Date(Date.now() - 172800000) // 2 days ago
      },
      {
        id: randomUUID(),
        fullName: "Emma Rodriguez",
        email: "emma.rodriguez@email.com",
        phone: "+1-555-0789",
        destination: "Siwa Oasis",
        preferredDates: "May 5-12, 2025",
        specialRequests: "Wellness retreat focus, dietary restrictions",
        createdAt: new Date(Date.now() - 259200000) // 3 days ago
      }
    ];

    sampleInquiries.forEach(inquiry => {
      this.inquiries.set(inquiry.id, inquiry);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of Array.from(this.users.values())) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: randomUUID(),
      role: insertUser.role || "editor",
      createdAt: new Date()
    };
    this.users.set(user.id, user);
    return user;
  }

  // Inquiry methods
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const inquiry: Inquiry = {
      id: randomUUID(),
      fullName: insertInquiry.fullName,
      email: insertInquiry.email,
      phone: insertInquiry.phone || null,
      destination: insertInquiry.destination || null,
      preferredDates: insertInquiry.preferredDates || null,
      specialRequests: insertInquiry.specialRequests || null,
      createdAt: new Date()
    };
    this.inquiries.set(inquiry.id, inquiry);
    return inquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getInquiry(id: string): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }

  // Page methods
  async createPage(insertPage: InsertPage): Promise<Page> {
    const page: Page = {
      id: randomUUID(),
      slug: insertPage.slug,
      titleEn: insertPage.titleEn,
      titleEs: insertPage.titleEs || null,
      titleFr: insertPage.titleFr || null,
      titleJp: insertPage.titleJp || null,
      metaTitle: insertPage.metaTitle || null,
      metaDescription: insertPage.metaDescription || null,
      status: insertPage.status || "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: insertPage.createdBy || null
    };
    this.pages.set(page.id, page);
    return page;
  }

  async getPages(): Promise<Page[]> {
    return Array.from(this.pages.values()).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getPage(id: string): Promise<Page | undefined> {
    return this.pages.get(id);
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    for (const page of Array.from(this.pages.values())) {
      if (page.slug === slug) {
        return page;
      }
    }
    return undefined;
  }

  async updatePage(id: string, updateData: Partial<InsertPage>): Promise<Page | undefined> {
    const existingPage = this.pages.get(id);
    if (!existingPage) return undefined;

    const updatedPage: Page = {
      ...existingPage,
      ...updateData,
      updatedAt: new Date()
    };
    this.pages.set(id, updatedPage);
    return updatedPage;
  }

  async deletePage(id: string): Promise<boolean> {
    return this.pages.delete(id);
  }

  // Section methods
  async createSection(insertSection: InsertSection): Promise<Section> {
    const section: Section = {
      id: randomUUID(),
      pageId: insertSection.pageId,
      type: insertSection.type,
      orderIndex: insertSection.orderIndex || 0,
      contentJson: insertSection.contentJson,
      createdAt: new Date()
    };
    this.sections.set(section.id, section);
    return section;
  }

  async getSectionsByPageId(pageId: string): Promise<Section[]> {
    return Array.from(this.sections.values())
      .filter(section => section.pageId === pageId)
      .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
  }

  async updateSection(id: string, updateData: Partial<InsertSection>): Promise<Section | undefined> {
    const existingSection = this.sections.get(id);
    if (!existingSection) return undefined;

    const updatedSection: Section = {
      ...existingSection,
      ...updateData
    };
    this.sections.set(id, updatedSection);
    return updatedSection;
  }

  async deleteSection(id: string): Promise<boolean> {
    return this.sections.delete(id);
  }

  // Post methods
  async createPost(insertPost: InsertPost): Promise<Post> {
    const post: Post = {
      id: randomUUID(),
      slug: insertPost.slug,
      titleEn: insertPost.titleEn,
      titleEs: insertPost.titleEs || null,
      titleFr: insertPost.titleFr || null,
      titleJp: insertPost.titleJp || null,
      bodyEn: insertPost.bodyEn || null,
      bodyEs: insertPost.bodyEs || null,
      bodyFr: insertPost.bodyFr || null,
      bodyJp: insertPost.bodyJp || null,
      featuredImage: insertPost.featuredImage || null,
      excerpt: insertPost.excerpt || null,
      status: insertPost.status || "draft",
      publishedAt: insertPost.publishedAt || null,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: insertPost.createdBy || null
    };
    this.posts.set(post.id, post);
    return post;
  }

  async getPosts(): Promise<Post[]> {
    return Array.from(this.posts.values()).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getPost(id: string): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    for (const post of Array.from(this.posts.values())) {
      if (post.slug === slug) {
        return post;
      }
    }
    return undefined;
  }

  async updatePost(id: string, updateData: Partial<InsertPost>): Promise<Post | undefined> {
    const existingPost = this.posts.get(id);
    if (!existingPost) return undefined;

    const updatedPost: Post = {
      ...existingPost,
      ...updateData,
      updatedAt: new Date()
    };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async deletePost(id: string): Promise<boolean> {
    return this.posts.delete(id);
  }

  // Media methods
  async createMedia(insertMedia: InsertMedia): Promise<Media> {
    const media: Media = {
      id: randomUUID(),
      filename: insertMedia.filename,
      originalName: insertMedia.originalName,
      mimeType: insertMedia.mimeType,
      size: insertMedia.size,
      url: insertMedia.url,
      altEn: insertMedia.altEn || null,
      altEs: insertMedia.altEs || null,
      altFr: insertMedia.altFr || null,
      altJp: insertMedia.altJp || null,
      caption: insertMedia.caption || null,
      createdAt: new Date(),
      uploadedBy: insertMedia.uploadedBy || null
    };
    this.mediaFiles.set(media.id, media);
    return media;
  }

  async getMedia(): Promise<Media[]> {
    return Array.from(this.mediaFiles.values()).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getMediaById(id: string): Promise<Media | undefined> {
    return this.mediaFiles.get(id);
  }

  async deleteMedia(id: string): Promise<boolean> {
    return this.mediaFiles.delete(id);
  }

  // Hotel methods
  async createHotel(insertHotel: InsertHotel): Promise<Hotel> {
    const hotel: Hotel = {
      id: randomUUID(),
      name: insertHotel.name,
      location: insertHotel.location,
      region: insertHotel.region,
      type: insertHotel.type,
      rating: insertHotel.rating,
      priceTier: insertHotel.priceTier,
      amenities: insertHotel.amenities,
      image: insertHotel.image,
      description: insertHotel.description,
      featured: insertHotel.featured || false,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: insertHotel.createdBy || null
    };
    this.hotels.set(hotel.id, hotel);
    return hotel;
  }

  async getHotels(): Promise<Hotel[]> {
    return Array.from(this.hotels.values()).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getHotel(id: string): Promise<Hotel | undefined> {
    return this.hotels.get(id);
  }

  async updateHotel(id: string, updateData: Partial<InsertHotel>): Promise<Hotel | undefined> {
    const existingHotel = this.hotels.get(id);
    if (!existingHotel) return undefined;

    const updatedHotel: Hotel = {
      ...existingHotel,
      ...updateData,
      updatedAt: new Date()
    };
    this.hotels.set(id, updatedHotel);
    return updatedHotel;
  }

  async deleteHotel(id: string): Promise<boolean> {
    return this.hotels.delete(id);
  }

  // Delete inquiry method
  async deleteInquiry(id: string): Promise<boolean> {
    return this.inquiries.delete(id);
  }
}

// Use in-memory storage for development (prevents database connection issues)
export const storage = new MemoryStorage();