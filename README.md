
# Learning Management System - Backend

This repository contains a simple Node.js/Express backend for a Learning Management System (LMS). It provides APIs for authentication, courses, lessons, and user actions (joining courses, tracking lesson completion, and user stats).

This README documents how to set up and run the project locally, environment variables used, and a full description of the backend API endpoints with example requests and expected responses.

## Table of contents

- Project overview
- Requirements
- Installation
- Environment variables
- Run the server
- API endpoints
	- Authentication
	- Courses
	- Lessons
	- User actions
- Data models (summary)
- Development notes & assumptions
- Next steps

## Project overview

The backend exposes REST endpoints for:

- User authentication (register / login)
- CRUD-like operations for courses and lessons (create, update, delete, list, get)
- Course search and "similar" suggestions
- User operations: join course, mark lesson complete, get user stats

The project structure (top-level) includes:

- `index.js` - application entry (Express setup and route mounting)
- `dbConnection.js` - database connection helper
- `routes/` - route definitions for auth, courses, lessons, users
- `controller/` - controller implementations for each route
- `models/` - data model helpers (JS objects or ORM models)
- `middleware/auth.js` - authentication middleware

## Requirements

- Node.js 14+ (recommended 16+)
- npm (or yarn)
- A running database (the project likely expects MongoDB or a SQL DB depending on `dbConnection.js` implementation). Check `dbConnection.js` to confirm and set the corresponding connection string in ENV.

## Installation

1. Clone the repository and change into the project directory.
2. Install dependencies:

```powershell
npm install
```

3. Create a `.env` file in the project root (see environment variables section below).

## Environment variables

The app requires a few environment variables. Create a `.env` file in the root like:

```env
PORT=3000
DB_URI=<your-database-connection-string>
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
# Any other variables your dbConnection or app expects
```

- PORT: (optional) port to run the server on. Defaults to 3000 if not provided.
- DB_URI: connection string to your database (MongoDB URI or SQL connection string depending on the project code).
- JWT_SECRET: secret used to sign JWT tokens for authentication.
- JWT_EXPIRES_IN: token expiry duration (optional, e.g. `7d`).

If the project uses another DB or additional ENV keys, inspect `dbConnection.js` and `index.js` for exact variable names.

## Run the server

Start the server in development:

```powershell
npm start
# or if package.json defines a dev script using nodemon:
npm run dev
```

The server will start on the configured `PORT`.

## API endpoints

Notes:

- All endpoints that modify data or return protected user data require an `Authorization` header with a valid JWT token in the format `Bearer <token>`. The middleware implementing this is `middleware/auth.js`.
- Request/response examples below are JSON.

Base URL: http://localhost:3000 (adjust for your `PORT`)

### Authentication

- POST /auth/register

	Register a new user.

	Request body (example):

	```json
	{
		"name": "Alice",
		"email": "alice@example.com",
		"password": "s3cret"
	}
	```

	Response (success, 201):

	```json
	{
		"message": "User registered",
		"user": { "id": "...", "name": "Alice", "email": "alice@example.com" }
	}
	```

- POST /auth/login

	Login and receive a JWT.

	Request body:

	```json
	{ "email": "alice@example.com", "password": "s3cret" }
	```

	Response (success, 200):

	```json
	{
		"token": "<jwt-token>",
		"user": { "id": "...", "name": "Alice", "email": "alice@example.com" }
	}
	```

### Courses

- POST /course/create

	Create a new course. (Protected)

	Request body example:

	```json
	{
		"title": "Intro to Node.js",
		"description": "Learn Node.js fundamentals",
		"category": "backend",
		"authorId": "<userId>",
		"price": 0
	}
	```

	Response (201): newly created course object.

- GET /course/geAll

	Get all courses (paginated or full depending on implementation).

	Query params commonly supported: `page`, `limit`, `q` (search).

	Response (200): array of courses.

- GET /course/getOne/:id

	Get details for a single course by id.

- PUT /course/update/:id

	Update a course. (Protected)

- DELETE /course/delete/:id

	Delete a course. (Protected)

- GET /course/search?q=term

	Search courses by term.

- GET /course/similar/:id

	Get similar courses for the given course id.

### Lessons

- POST /lesson/create

	Create a lesson (Protected). Request body includes `title`, `content`, `courseId`, `duration`, etc.

- GET /lesson/geAll

	List all lessons. May support filtering by course.

- GET /lesson/getOne/:id

	Get a single lesson.

- GET /lesson/getByCourseLesson/:courseId

	Get lessons for a given course (useful to display course contents).

- PUT /lesson/update/:id

	Update lesson details. (Protected)

- DELETE /lesson/delete/:id

	Delete a lesson. (Protected)

- GET /lesson/search?q=term

	Search lessons.

- GET /lesson/similar/:id

	Get similar lessons by id.

### User actions

- POST /user/joinCourse

	Join a course (Protected).

	Request body: { "courseId": "..." }

	Response: updated user or enrollment object.

- POST /user/completeLesson

	Mark a lesson completed for a user (Protected).

	Request body: { "lessonId": "..." }

	Response: updated user lesson progress object.

- GET /user/getUser/:id

	Get user profile data. (Protected, or public depending on implementation.)

- GET /user/getStatsUser/:id

	Get user statistics (lessons completed, courses joined, progress). (Protected)

- POST /user/addLesson

	Add lesson to a user's plan/bookmark (Protected).

## Data models (summary)

These are the minimal fields expected by the API. Check `models/` for exact shapes.

- User
	- id, name, email, passwordHash, joinedCourses[], completedLessons[], role

- Course
	- id, title, description, category, authorId, lessons[], price, createdAt

- Lesson
	- id, title, content (or url), courseId, duration, order

- UserLesson (or progress)
	- id, userId, lessonId, status (completed/in-progress), completedAt

## Development notes & assumptions

- Authentication uses JWT tokens. The middleware is in `middleware/auth.js`. Include `Authorization: Bearer <token>` on protected endpoints.
- Database type is not explicitly specified in this README; inspect `dbConnection.js` to determine whether it's MongoDB or SQL. Set `DB_URI` accordingly.
- Endpoints use controllers under `controller/<resource>/`.
- Some route names follow a slightly unusual naming (for example `geAll` rather than `getAll`). Use the exact route path as implemented in `routes/` when testing.

## Quick testing examples (using curl or any HTTP client)

Authenticate and store token:

```powershell
# Register
curl -Method POST -H "Content-Type: application/json" -Body '{"name":"Test","email":"test@example.com","password":"password"}' http://localhost:3000/auth/register

# Login (store token from response)
curl -Method POST -H "Content-Type: application/json" -Body '{"email":"test@example.com","password":"password"}' http://localhost:3000/auth/login
```

Create a course (example using PowerShell with a stored token in $env:TOKEN):

```powershell
$headers = @{ Authorization = "Bearer $env:TOKEN"; 'Content-Type' = 'application/json' }
$body = '{"title":"New Course","description":"...","category":"general"}'
Invoke-RestMethod -Method Post -Uri http://localhost:3000/course/create -Headers $headers -Body $body
```
