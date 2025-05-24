import express from "express";

import {
  createComment,
  getCommentForPost,
} from "../controllers/commentController";

const router = express.Router();

router.post("/createComment", createComment);

router.get("/post/:postId/comments", getCommentForPost);

export default router;
