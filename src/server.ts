// src/server.ts
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth";
import postRoutes from "./routes/post";
import commentRoutes from "./routes/Comment";
import likeRoutes from "./routes/like";
import currentRoutes from "./routes/Current";
import authMiddleware from "./middlewares/authMiddleware";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

//routes
app.use("/api/auth", authRoutes); // excuding middleware in signup,signin

app.use(authMiddleware);
app.use("/api/post", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/users", currentRoutes);

//Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
