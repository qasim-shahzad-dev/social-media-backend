import express from "express";
import { createPost, getPosts } from "../controllers/postcontroller";
import upload from "../utils/multerConfig";


const router = express.Router();

//create post
router.post("/createPost",upload.single("image"), createPost);

//Get ALL Posts
router.get("/getPosts", getPosts);

export default router;
