# Overview

The Pressure Play is a modern podcast website built as a full-stack web application. It's designed to showcase episodes, guests, and provide various ways for users to consume content (watching, listening) while building an audience through newsletter subscriptions and contact forms. The application features a premium, social-first design with podcast episode management, guest profiles, and multiple content consumption methods.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for home, episodes, guests, watch, listen, newsletter, partners, press, and contact
- **Styling**: Tailwind CSS with custom CSS variables for brand theming, supporting both dark and neon theme variants
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessibility and consistency
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **API Design**: RESTful API with routes for episodes, guests, newsletter subscriptions, and contact messages
- **Data Layer**: In-memory storage implementation with interface for easy database integration
- **Development**: Vite middleware integration for hot reloading in development

## Component Structure
- **Layout Components**: Site header with navigation, footer with social links, audio player for episode playback
- **Content Components**: Episode cards, guest cards, hero section, newsletter section, featured content displays
- **UI Components**: Complete shadcn/ui component library including forms, dialogs, cards, buttons, and navigation elements

## Data Models
The application uses a well-defined schema with the following main entities:
- **Episodes**: Podcast episodes with metadata, cover art, duration, platforms, guests, topics, and optional video content
- **Guests**: Guest profiles with bio, headshot, social links, tags, and associated episodes
- **Newsletter Subscribers**: Email subscription management with confirmation status
- **Contact Messages**: Contact form submissions with categorization
- **Topics**: Content categorization system

## Theme System
- **Brand Colors**: Custom CSS variables for The Pressure Play brand including midnight, magenta, cyan, coral, and slate colors
- **Typography**: Inter font family for body text with JetBrains Mono for monospace elements
- **Theme Variants**: Dark theme (primary) and neon theme (promotional) with toggle functionality

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form, React Query for frontend functionality
- **Routing**: Wouter for lightweight client-side routing
- **Build Tools**: Vite for development and build processes, TypeScript for type safety

## UI and Styling
- **Component Library**: Radix UI primitives (@radix-ui/*) for accessible, unstyled components
- **Styling**: Tailwind CSS with PostCSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Animations**: Framer Motion potential integration, CSS-based animations currently

## Backend Infrastructure
- **Server**: Express.js for API routes and middleware
- **Database**: Drizzle ORM configured for PostgreSQL with Neon Database serverless driver
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution in development

## Validation and Utilities
- **Schema Validation**: Zod for runtime type checking and form validation
- **Utility Libraries**: clsx and tailwind-merge for conditional CSS classes
- **Date Handling**: date-fns for date formatting and manipulation

## Development Tools
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint and Prettier configuration (implied by package structure)
- **Development Experience**: Replit integration with development banner and error overlay