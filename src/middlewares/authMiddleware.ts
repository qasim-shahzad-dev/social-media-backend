import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface AuthRequest extends Request {
  user :{
    id:string;
    email?:string;
  }
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res
      .status(401)
      .json({ message: "No token, authorization denied", status:401, success:false });
    return; // ✅ Only return if token is missing
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      email:string;
    };
    req.user = {
      id:decoded.userId,
      email: decoded.email,
    } 
      
    next(); // ✅ Valid token
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token", status:401, success:false });
    return; // ✅ Only return if token is invalid
  }
};
export default authMiddleware;
