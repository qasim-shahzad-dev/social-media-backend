import express from "express";

import { toggleLike } from "../controllers/likeController";

const router = express.Router();

//toggleLike

router.post("/:id", toggleLike);

export default router;
