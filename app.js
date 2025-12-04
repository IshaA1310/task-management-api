import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
import taskRoutes from "./src/routes/task.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', authRoutes);
app.use('/api/tasks', taskRoutes);

export default app;
