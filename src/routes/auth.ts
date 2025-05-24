import express from "express";

import { login, signup } from "../controllers/authController";

const router = express.Router();

//register route

router.post("/signup", signup);

router.post("/signin", login);

export default router;
