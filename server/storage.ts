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

export const storage = new DatabaseStorage();
