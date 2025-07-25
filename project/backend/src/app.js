import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRouter from './routes/notes.js';
import { errorHandler } from "./utils/errorHandler.js";
import { prisma } from "./utils/prisma.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend URL
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.get("/", (_, res) => {
  res.json({ message: "CollabNote API is running!" });
});

app.use("/api/notes", notesRouter);

// Global error handler
app.use(errorHandler);

// Start server

const startServer = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to the database');
    console.error(error);
    process.exit(1); // Stop the process if DB fails
  }
};

startServer();
