import express from "express";

import { toggleLike } from "../controllers/likeController";

const router = express.Router();

//toggleLike

router.post("/post/:postId/like", toggleLike);

export default router;
