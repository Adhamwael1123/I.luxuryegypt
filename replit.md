# Overview

ILuxuryEgypt is a luxury travel website for bespoke Egyptian travel experiences. This is a full-stack React application that showcases premium travel services and allows potential customers to submit travel inquiries through a contact form. The application features an elegant design with custom Egyptian-inspired branding and handles luxury travel booking inquiries.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React + TypeScript**: Single-page application built with React 18 and TypeScript for type safety
- **Vite**: Fast development server and build tool for optimal performance
- **Wouter**: Lightweight client-side routing library for navigation
- **TanStack Query**: Server state management for API calls and caching
- **Shadcn/ui + Radix UI**: Component library providing accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom Egyptian luxury theme
- **React Hook Form + Zod**: Form handling with validation schema

## Backend Architecture
- **Express.js**: Node.js web framework handling API routes
- **TypeScript**: End-to-end type safety across the application
- **In-Memory Storage**: Simple storage implementation using Map data structures for development
- **Shared Schema**: Common TypeScript types and Zod validation schemas shared between frontend and backend

## Database Design
- **Drizzle ORM**: Type-safe PostgreSQL ORM with migrations support
- **Schema Structure**: 
  - Users table for potential authentication
  - Inquiries table storing customer travel requests with fields for contact info, destination preferences, dates, and special requests
- **Neon Database**: Serverless PostgreSQL configured for production deployment

## Component Architecture
- **Modular Components**: Organized into feature-based components (hero, navigation, forms, etc.)
- **UI Component Library**: Comprehensive set of reusable UI components with consistent styling
- **Responsive Design**: Mobile-first approach with custom breakpoints
- **Custom Theming**: Egyptian luxury brand colors (Nile Blue, Pharaoh Gold, Papyrus White, Desert Sand)

## Form Handling
- **React Hook Form**: Performant form management with minimal re-renders
- **Zod Validation**: Schema-based form validation shared between client and server
- **Error Handling**: User-friendly error messages and validation feedback
- **Success States**: Confirmation messaging after successful inquiry submission

# External Dependencies

## UI Framework
- **Radix UI**: Accessible component primitives for complex UI interactions
- **Lucide React**: Icon library for consistent iconography
- **Tailwind CSS**: Styling framework with custom configuration

## Development Tools
- **Vite**: Development server with HMR and optimized builds
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds

## Database & ORM
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database operations and migrations
- **Drizzle Kit**: Database migration and schema management tools

## State Management
- **TanStack Query**: Server state management, caching, and API synchronization
- **React Hook Form**: Client-side form state management

## Validation
- **Zod**: Runtime type validation for forms and API endpoints
- **Drizzle Zod**: Integration between Drizzle schemas and Zod validation

## Fonts & Assets
- **Google Fonts**: Playfair Display (serif) and Inter (sans-serif) font families
- **Unsplash**: High-quality Egyptian destination photography

## Development Environment
- **Replit Integration**: Development banner and cartographer plugin for Replit environment
- **PostCSS**: CSS processing with Tailwind and Autoprefixer