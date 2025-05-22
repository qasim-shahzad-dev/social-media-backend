// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import postRoutes from './routes/post';
import commentRoutes from './routes/Comment';
import likeRoutes from './routes/like';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authMiddleware from './middlewares/authMiddleware';

dotenv.config();
connectDB();




const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));






//routes
app.use('/api/auth', authRoutes);
app.use(authMiddleware)
app.use('/api/post',authMiddleware, postRoutes)
app.use('/api/comments',authMiddleware, commentRoutes);
app.use('/api/likes',authMiddleware, likeRoutes);



//Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})