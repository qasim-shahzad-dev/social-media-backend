import { Router } from "express";
import { verifyWebhookMiddleware } from "../middlewares/verfyWebhook";
import { receiveWebhook } from "../controllers/webhookController";

const router = Router();

router.post("/", verifyWebhookMiddleware, receiveWebhook);

export default router;
