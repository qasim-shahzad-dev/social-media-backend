import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  _id: string;
  email?: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // ✅ Instead of assigning directly to req.user, store in a safe variable
    (req as any).userId = decoded._id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
