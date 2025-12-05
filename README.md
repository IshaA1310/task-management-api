Task Management API – Node.js + Express + MongoDB

A backend application that allows users to register, login, and manage their tasks with authentication, filtering, sorting, and pagination.
This project is deployed live on cloud and uses environment variables for secure configuration.

Live API URL
https://your-render-app-url.onrender.com

GitHub Repository
https://github.com/your-username/your-repo-name

Features
Authentication

User Registration (POST /users/register)

User Login (POST /users/login)

JWT Token-based Authentication

Protected Routes (tasks accessible only to logged-in users)

Task Management

Create Task (POST /tasks)

Get All Tasks (GET /tasks)

Get Single Task (GET /tasks/:id)

Update Task (PUT /tasks/:id)

Delete Task (DELETE /tasks/:id)

Filtering

Filter by status (Pending, In Progress, Done)

Filter by priority (Low, Medium, High)

Sorting

Sort tasks by priority or createdAt

Pagination

GET /tasks?page=1&limit=10

Security

Password hashing (bcrypt)

JWT protected routes

🛠 Tech Stack

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

bcrypt

express-validator / Joi

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

Environment Variables (.env)
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key

Installation & Setup
Clone the repository
git clone https://github.com/IshaA1310/task-management-api.git

Install dependencies
npm install

Create .env file
MONGO_URI=your-mongo-url
JWT_SECRET=your-secret
PORT=5000

Start the server
npm start

API Endpoints
Auth Routes
Register
POST /users/register


Body:

{
  "name": "Isha",
  "email": "isha@example.com",
  "password": "123456"
}

Login
POST /users/login

Task Routes (Protected)

Include header:

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

Deployment (Render Cloud)

Connected GitHub repo to Render

Added environment variables under “Environment”

Enabled auto deploy from main branch
