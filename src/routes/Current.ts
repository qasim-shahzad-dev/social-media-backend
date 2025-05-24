import express from "express";
import { getCurrentUser } from "../controllers/CurrentController";

const router = express.Router();

router.get("/current", getCurrentUser);

export default router;
