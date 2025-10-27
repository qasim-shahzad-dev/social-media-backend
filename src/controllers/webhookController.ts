import { Request, Response } from "express";
import { handleEvent } from "../events/webhook/eventHandler";

export const receiveWebhook = (req: Request, res: Response) => {
  console.log("✅ Webhook payload received:", req.body);
  handleEvent(req);
   res.status(200).json({ message: "Webhook processed successfully" })
   return;
};
