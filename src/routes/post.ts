import express from "express";
import { createPost, getPosts } from "../controllers/postcontroller";

const router = express.Router();

//create post
router.post("/createPost", createPost);

//Get ALL Posts
router.get("/getPosts", getPosts);

export default router;
