import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { 
  type User, type InsertUser, type Inquiry, type InsertInquiry,
  type Page, type InsertPage, type Section, type InsertSection,
  type Post, type InsertPost, type Media, type InsertMedia,
  users, inquiries, pages, sections, posts, media as mediaTable
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
}

// Memory Storage Implementation for Development
export class MemoryStorage implements IStorage {
  private users = new Map<string, User>();
  private inquiries = new Map<string, Inquiry>();
  private pages = new Map<string, Page>();
  private sections = new Map<string, Section>();
  private posts = new Map<string, Post>();
  private mediaFiles = new Map<string, Media>();

  constructor() {
    // Pre-populate with default admin user
    this.seedDefaultUser();
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

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
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
    const pagesArray: Page[] = [];
    for (const page of this.pages.values()) {
      pagesArray.push(page);
    }
    return pagesArray.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getPage(id: string): Promise<Page | undefined> {
    return this.pages.get(id);
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    for (const page of this.pages.values()) {
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
    const sectionsArray: Section[] = [];
    for (const section of this.sections.values()) {
      if (section.pageId === pageId) {
        sectionsArray.push(section);
      }
    }
    return sectionsArray.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
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
    const postsArray: Post[] = [];
    for (const post of this.posts.values()) {
      postsArray.push(post);
    }
    return postsArray.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getPost(id: string): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    for (const post of this.posts.values()) {
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
    const mediaArray: Media[] = [];
    for (const media of this.mediaFiles.values()) {
      mediaArray.push(media);
    }
    return mediaArray.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getMediaById(id: string): Promise<Media | undefined> {
    return this.mediaFiles.get(id);
  }

  async deleteMedia(id: string): Promise<boolean> {
    return this.mediaFiles.delete(id);
  }
}

// Use in-memory storage for development (prevents database connection issues)
export const storage = new MemoryStorage();
