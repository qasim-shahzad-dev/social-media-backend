// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth';
import postRoutes from './routes/post';
import commentRoutes from './routes/Comment';
import likeRoutes from './routes/like';

dotenv.config();
connectDB();




const app = express();
app.use(express.json());






//routes
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes)
app.use('/api/comments', commentRoutes);
app.use('/api/likes',likeRoutes);



//Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})