import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import sequelize from "./config/database"; // Import DB connection
import authRoutes from "./routes/authRoutes"; // Import authentication routes
import issueRoutes from "./routes/taskRoutes"; // Import issue routes

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "*", // Allow frontend URL or all origins
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies (if needed)
  },
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // Allow frontend URL or all origins
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Connect to the database
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully ✅");
  } catch (error) {
    console.error("Database connection failed ❌:", error);
    process.exit(1);
  }
}

// WebSocket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Routes
console.log("Auth routes loaded");
console.log("Issue routes loaded");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", issueRoutes);

const PORT = process.env.PORT || 5000;

// Start server after DB connection
connectDB().then(() => {
  httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
