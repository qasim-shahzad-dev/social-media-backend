import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  _id: string;
  email?: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return; 
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    (req as any).userId = decoded._id;
    console.log("🚀 ~ verifyToken ~ decoded:", decoded)
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
