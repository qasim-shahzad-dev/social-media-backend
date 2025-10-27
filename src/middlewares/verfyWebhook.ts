import { NextFunction, Request, Response } from "express";
import { verifySignature } from "../utils/cryptoUtils";
import { WEBHOOK_TOKEN, SECRET } from "../constants/index";
import { generateSignature } from "../utils/cryptoUtils";

declare global {
    namespace Express {
        interface Request {
            rawBody?: string | Buffer;
        }
    }
}

export const verifyWebhookMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["x-webhook-token"] as string;
    const signature = req.headers["x-signature"] as string;
    // const timestamp = req.headers["x-timestamp"] as string;

    if (!token || token !== WEBHOOK_TOKEN) {
        res.status(401).json({ error: "Invalid webhook token" });
        return;
    }

    if (!signature ) {
        res.status(401).json({ error: "Missing signature or timestamp" });
        return;
    }
   
    const payload = req.rawBody;
      const isValid = verifySignature('LIVE', payload, signature);

  if (!isValid) {
    console.log('Expected:', generateSignature('LIVE', payload));
    console.log('Received:', signature);
     res.status(403).json({ error: 'Invalid signature' });
     return
  }

    if (!verifySignature(SECRET, payload, signature)) {
        res.status(403).json({ error: "Invalid signature" });
        return;
    }
    next();
}

