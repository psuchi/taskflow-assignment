# TaskFlow - Task Management Application

## Overview
TaskFlow is a full-stack task management application with JWT authentication, built with React, Node.js, Express, and PostgreSQL.

## Project Architecture

### Frontend (client/)
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui components
- **State Management**: React Query for server state, Context API for auth/theme
- **Routing**: Wouter
- **HTTP Client**: Axios

### Backend (server/)
- **Framework**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT tokens with bcrypt password hashing

### Shared (shared/)
- Contains Drizzle schema definitions and Zod validation schemas

## Key Files

### Frontend
- `client/src/App.tsx` - Main app component with routing
- `client/src/contexts/AuthContext.tsx` - Authentication state management
- `client/src/contexts/ThemeContext.tsx` - Theme (dark/light) management
- `client/src/lib/api.ts` - Axios instance with auth interceptors
- `client/src/pages/` - Page components (login, register, dashboard, profile)
- `client/src/components/` - Reusable UI components

### Backend
- `server/routes.ts` - All API endpoints
- `server/auth.ts` - JWT utilities and middleware
- `server/storage.ts` - Database operations
- `server/db.ts` - Database connection

### Schema
- `shared/schema.ts` - Database models (users, tasks) and validation schemas

## Database Schema

### Users Table
- `id` (varchar, UUID, primary key)
- `email` (text, unique)
- `password` (text, bcrypt hashed)
- `name` (text)
- `createdAt` (timestamp)

### Tasks Table
- `id` (varchar, UUID, primary key)
- `userId` (varchar, foreign key to users)
- `title` (text)
- `description` (text, nullable)
- `status` (enum: todo, in_progress, completed)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/me` - Get current user (protected)
- `PATCH /api/auth/profile` - Update profile (protected)

### Tasks
- `GET /api/tasks` - Get all tasks (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `POST /api/tasks` - Create task (protected)
- `PATCH /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - JWT secret key

## Running the Application
1. Install dependencies: `npm install`
2. Push database schema: `npm run db:push`
3. Start development server: `npm run dev`

The app runs on port 5000.

## Recent Changes
- Initial implementation of full-stack task management app
- JWT authentication with bcrypt password hashing
- CRUD operations for tasks
- Search and filter functionality
- User profile management
- Dark/light theme toggle
