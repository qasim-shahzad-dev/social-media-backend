import express from "express";
import {createPost, getPosts} from '../controllers/postcontroller';
import authMiddleware  from "../middlewares/authMiddleware";

const router = express.Router();

//create post
router.post('/', authMiddleware, createPost);

//Get ALL Posts
router.get('/',getPosts);

export default router;