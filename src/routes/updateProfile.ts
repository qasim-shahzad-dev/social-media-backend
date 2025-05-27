import express from "express";
import { updateProfile } from "../controllers/updateProfileController";

const router = express.Router();

router.put("/updateProfile", updateProfile)

export default router;