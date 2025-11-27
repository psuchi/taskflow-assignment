# TaskFlow API Documentation

Base URL: `/api`

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation error
- `409 Conflict`: Email already registered

---

### Login
Authenticate an existing user.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Invalid email or password

---

### Get Current User
Get the authenticated user's information.

**Endpoint:** `GET /api/auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "user": {
    "id": "uuid-here",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: User not found

---

### Update Profile
Update the authenticated user's information.

**Endpoint:** `PATCH /api/auth/profile`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "uuid-here",
    "email": "john.smith@example.com",
    "name": "John Smith"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Invalid or missing token
- `409 Conflict`: Email already in use

---

## Task Endpoints

### Get All Tasks
Get all tasks for the authenticated user.

**Endpoint:** `GET /api/tasks`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `search` (optional): Search term for title/description
- `status` (optional): Filter by status (`todo`, `in_progress`, `completed`, `all`)

**Response (200 OK):**
```json
[
  {
    "id": "uuid-here",
    "userId": "user-uuid",
    "title": "Complete project",
    "description": "Finish the task management app",
    "status": "in_progress",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

### Get Single Task
Get a specific task by ID.

**Endpoint:** `GET /api/tasks/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "id": "uuid-here",
  "userId": "user-uuid",
  "title": "Complete project",
  "description": "Finish the task management app",
  "status": "in_progress",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: Task not found

---

### Create Task
Create a new task.

**Endpoint:** `POST /api/tasks`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "New task",
  "description": "Task description (optional)",
  "status": "todo"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid-here",
  "userId": "user-uuid",
  "title": "New task",
  "description": "Task description (optional)",
  "status": "todo",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Invalid or missing token

---

### Update Task
Update an existing task.

**Endpoint:** `PATCH /api/tasks/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body (all fields optional):**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed"
}
```

**Response (200 OK):**
```json
{
  "id": "uuid-here",
  "userId": "user-uuid",
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: Task not found

---

### Delete Task
Delete a task.

**Endpoint:** `DELETE /api/tasks/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (204 No Content)**

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: Task not found

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

## Task Status Values

| Value | Description |
|-------|-------------|
| `todo` | Task not started |
| `in_progress` | Task is being worked on |
| `completed` | Task is finished |
