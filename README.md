Task Management API – Node.js, Express, MongoDB

A backend application that allows users to register, login, and manage their tasks.
Includes authentication, filtering, sorting, and pagination.
This API is deployed on Render with environment-based configuration.

Live API URL

https://task-management-api-5cr8.onrender.com

GitHub Repository

https://github.com/IshaA1310/task-management-api

Features
Authentication

User Registration (POST /users/register)

User Login (POST /users/login)

JWT authentication

Password hashing using bcrypt

Protected task routes

Task Management

Create Task

Get All Tasks

Get Single Task

Update Task

Delete Task

Filtering

Filter tasks by status: Pending, In Progress, Done

Filter tasks by priority: Low, Medium, High

Sorting

Sort by createdAt or priority

Pagination

/tasks?page=1&limit=10

Tech Stack

Node.js

Express.js

MongoDB (Mongoose)

JWT

bcrypt

express-validator

Project Structure
├── controllers
│   ├── AuthController.js
│   └── TaskController.js
├── models
│   ├── User.js
│   └── Task.js
├── routes
│   ├── authRoutes.js
│   └── taskRoutes.js
├── middleware
│   └── auth.js
├── config
│   └── db.js
├── server.js
└── .env

Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key

Installation & Setup
1. Clone the repository
git clone https://github.com/IshaA1310/task-management-api.git
cd task-management-api

2. Install dependencies
npm install

3. Create .env file

Add:

MONGO_URI=your-mongo-db-url
JWT_SECRET=your-secret
PORT=5000

4. Start the application
npm start

API Endpoints
Authentication Routes
Register

POST /users/register
Request Body:

{
  "name": "Isha",
  "email": "isha@example.com",
  "password": "123456"
}

Login

POST /users/login

Task Routes (Protected)

Header required:

Authorization: Bearer <token>

Create Task

POST /tasks

Get All Tasks

GET /tasks?page=1&limit=10&status=Pending&priority=High&sort=createdAt

Get Single Task

GET /tasks/:id

Update Task

PUT /tasks/:id

Delete Task

DELETE /tasks/:id

Deployment on Render

GitHub repository connected to Render

Environment variables added

Auto-deploy enabled on main branch

Build command: npm install

Start command: node server.js

Author

Isha Aggarwal
Backend / Full Stack Developer
GitHub: https://github.com/IshaA1310
LinkedIn: https://www.linkedin.com/in/isha-a-20a9122a
