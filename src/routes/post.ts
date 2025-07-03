import express from "express";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/postcontroller";
import upload from "../utils/multerConfig";


const router = express.Router();

router.post("/createPost",upload.single("image"), createPost);

router.get("/getPosts", getPosts);

router.get("/getPost/:id", getPostById)

router.put("/updatePost/:id",upload.single("image"), updatePost);


router.delete("/deletePost/:id", deletePost)

export default router;
