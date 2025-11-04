import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("editor"), // admin, editor, translator, viewer
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  destination: text("destination"),
  preferredDates: text("preferred_dates"),
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// CMS Tables
export const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  titleEn: text("title_en").notNull(),
  titleEs: text("title_es"),
  titleFr: text("title_fr"),
  titleJp: text("title_jp"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  status: text("status").notNull().default("draft"), // draft, published
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: varchar("created_by").references(() => users.id),
});

export const sections = pgTable("sections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageId: varchar("page_id").references(() => pages.id).notNull(),
  type: text("type").notNull(), // hero, text, gallery, carousel, pricing, etc
  orderIndex: integer("order_index").notNull().default(0),
  contentJson: jsonb("content_json").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  titleEn: text("title_en").notNull(),
  titleEs: text("title_es"),
  titleFr: text("title_fr"),
  titleJp: text("title_jp"),
  bodyEn: text("body_en"),
  bodyEs: text("body_es"),
  bodyFr: text("body_fr"),
  bodyJp: text("body_jp"),
  featuredImage: text("featured_image"),
  excerpt: text("excerpt"),
  focusKeyword: text("focus_keyword"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  status: text("status").notNull().default("draft"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: varchar("created_by").references(() => users.id),
});

export const media = pgTable("media", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  url: text("url").notNull(),
  altEn: text("alt_en"),
  altEs: text("alt_es"),
  altFr: text("alt_fr"),
  altJp: text("alt_jp"),
  caption: text("caption"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  uploadedBy: varchar("uploaded_by").references(() => users.id),
});

export const hotels = pgTable("hotels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  region: text("region").notNull(),
  type: text("type").notNull(),
  rating: integer("rating").notNull(),
  priceTier: text("price_tier").notNull(),
  amenities: text("amenities").array().notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: varchar("created_by").references(() => users.id),
});

export const destinations = pgTable("destinations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  heroImage: text("hero_image").notNull(),
  gallery: text("gallery").array().notNull().default([]),
  highlights: text("highlights").array().notNull().default([]),
  bestTimeToVisit: text("best_time_to_visit"),
  duration: text("duration"),
  difficulty: text("difficulty").default("Easy"),
  region: text("region").notNull(),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: varchar("created_by").references(() => users.id),
});

export const tours = pgTable("tours", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  heroImage: text("hero_image").notNull(),
  gallery: text("gallery").array().notNull().default([]),
  duration: text("duration").notNull(),
  groupSize: text("group_size"),
  difficulty: text("difficulty").default("Easy"),
  price: integer("price").notNull(),
  currency: text("currency").notNull().default("USD"),
  includes: text("includes").array().notNull().default([]),
  excludes: text("excludes").array().notNull().default([]),
  itinerary: jsonb("itinerary").notNull(),
  destinations: text("destinations").array().notNull().default([]),
  category: text("category").notNull(),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: varchar("created_by").references(() => users.id),
});

export const packages = pgTable("packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  heroImage: text("hero_image").notNull(),
  gallery: text("gallery").array().notNull().default([]),
  duration: text("duration").notNull(),
  groupSize: text("group_size"),
  price: integer("price").notNull(),
  currency: text("currency").notNull().default("USD"),
  includes: text("includes").array().notNull().default([]),
  excludes: text("excludes").array().notNull().default([]),
  tours: text("tours").array().notNull().default([]), // Array of tour IDs
  hotels: text("hotels").array().notNull().default([]), // Array of hotel IDs
  destinations: text("destinations").array().notNull().default([]), // Array of destination IDs
  category: text("category").notNull(),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  createdBy: varchar("created_by").references(() => users.id),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  role: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
}).extend({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  destination: z.string().optional(),
  preferredDates: z.string().optional(),
  specialRequests: z.string().optional(),
});

// CMS Schemas
export const insertPageSchema = createInsertSchema(pages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSectionSchema = createInsertSchema(sections).omit({
  id: true,
  createdAt: true,
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMediaSchema = createInsertSchema(media).omit({
  id: true,
  createdAt: true,
});

export const insertHotelSchema = createInsertSchema(hotels).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z.string().min(1, "Hotel name is required"),
  location: z.string().min(1, "Location is required"),
  region: z.string().min(1, "Region is required"),
  type: z.string().min(1, "Hotel type is required"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  priceTier: z.string().min(1, "Price tier is required"),
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
  image: z.string().url("Please provide a valid image URL"),
  description: z.string().min(1, "Description is required"),
  featured: z.boolean().default(false),
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z.string().min(1, "Destination name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  heroImage: z.string().url("Please provide a valid hero image URL"),
  region: z.string().min(1, "Region is required"),
  gallery: z.array(z.string()).default([]),
  highlights: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export const insertTourSchema = createInsertSchema(tours).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  heroImage: z.string().url("Please provide a valid hero image URL"),
  duration: z.string().min(1, "Duration is required"),
  price: z.number().min(0, "Price must be 0 or greater"),
  currency: z.string().default("USD"),
  category: z.string().min(1, "Category is required"),
  includes: z.array(z.string()).default([]),
  excludes: z.array(z.string()).default([]),
  destinations: z.array(z.string()).default([]),
  gallery: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

export const insertPackageSchema = createInsertSchema(packages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z.string().min(1, "Package name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  heroImage: z.string().url("Please provide a valid hero image URL"),
  duration: z.string().min(1, "Duration is required"),
  price: z.number().min(0, "Price must be 0 or greater"),
  currency: z.string().default("USD"),
  category: z.string().min(1, "Category is required"),
  includes: z.array(z.string()).default([]),
  excludes: z.array(z.string()).default([]),
  tours: z.array(z.string()).default([]),
  hotels: z.array(z.string()).default([]),
  destinations: z.array(z.string()).default([]),
  gallery: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
});

// Login Schema
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Type Exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;
export type InsertSection = z.infer<typeof insertSectionSchema>;
export type Section = typeof sections.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;
export type InsertMedia = z.infer<typeof insertMediaSchema>;
export type Media = typeof media.$inferSelect;
export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type Hotel = typeof hotels.$inferSelect;
export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type Destination = typeof destinations.$inferSelect;
export type InsertTour = z.infer<typeof insertTourSchema>;
export type Tour = typeof tours.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Package = typeof packages.$inferSelect;
export type LoginRequest = z.infer<typeof loginSchema>;
