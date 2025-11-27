# TaskFlow - Task Management Application

A full-stack web application for managing tasks with user authentication, built with React, Node.js, Express, and PostgreSQL.

## Features

- **User Authentication**: Secure registration and login with JWT tokens and bcrypt password hashing
- **Protected Routes**: Dashboard and profile pages require authentication
- **Task Management**: Full CRUD operations for tasks
  - Create, read, update, and delete tasks
  - Task status management (To Do, In Progress, Completed)
  - Quick status toggle by clicking the status icon
- **Search & Filter**: Find tasks by title or description, filter by status
- **Profile Management**: View and update user information
- **Dark/Light Mode**: Theme toggle for user preference
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Shadcn/ui component library
- React Query for data fetching
- Axios for HTTP requests
- Wouter for routing
- React Hook Form with Zod validation

### Backend
- Node.js with Express
- PostgreSQL database
- Drizzle ORM
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (automatically provisioned on Replit)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `SESSION_SECRET`: Secret key for JWT token generation

4. Push the database schema:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Auth, Theme)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and API client
│   │   └── pages/          # Page components
│   └── index.html
├── server/                 # Backend Express application
│   ├── auth.ts            # JWT authentication utilities
│   ├── db.ts              # Database connection
│   ├── routes.ts          # API routes
│   └── storage.ts         # Database operations
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Drizzle schema and Zod validation
└── API.md                  # API documentation
```

## Usage

### Registration
1. Navigate to `/register`
2. Enter your name, email, and password
3. Click "Create Account"

### Login
1. Navigate to `/login`
2. Enter your email and password
3. Click "Sign In"

### Managing Tasks
1. Click "New Task" to create a task
2. Fill in the title, description (optional), and status
3. Click on a task's status icon to cycle through statuses
4. Use the menu (three dots) to edit or delete a task

### Search & Filter
1. Use the search bar to find tasks by title or description
2. Use the status dropdown to filter tasks by status

### Profile
1. Navigate to Profile from the sidebar
2. Update your name or email
3. Click "Update Profile" to save changes

## License

MIT License
