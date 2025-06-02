import express from "express";
import { updateProfile } from "../controllers/updateProfileController";

const router = express.Router();

router.put("/update-profile", updateProfile)

export default router;