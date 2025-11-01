// src/server.ts
import express from "express";
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from "dotenv";
import connectDB from "./config/db";
import { redis } from "./config/redisClient";
import authRoutes from "./routes/auth";
import postRoutes from "./routes/post";
import commentRoutes from "./routes/Comment";
// import likeRoutes from "./routes/like";
import currentRoutes from "./routes/Current";
import {verifyToken} from "./middlewares/authMiddleware";
import updateProfileRoutes from "./routes/updateProfile";
import webhookRoutes from "./routes/webhook.routes";
import setupUserListeners from "./listeners/user.Listner"
dotenv.config();

const app = express();
app.use(
  express.json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf.toString(); // save raw body for later
    },
  })
);
setupUserListeners();
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", currentRoutes);
app.use("/api/post",verifyToken, postRoutes);
app.use("/api/comments", commentRoutes);
// app.use("/api/likes", likeRoutes);
app.use("/api/user", updateProfileRoutes)

//Webhook
app.use("/api/webhook", webhookRoutes);

//Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await redis.connect();
   connectDB();
  console.log(`Server is running on port ${PORT}`);
});

