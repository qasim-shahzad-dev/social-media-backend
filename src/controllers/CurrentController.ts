import { Request, Response } from "express";
import User from "../models/User";

interface AuthRequest extends Request {
  userId?: string;
}
export const getCurrentUser = async (req: AuthRequest, res: any) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ message: "User not found", status: 404, sucess: false });
    res.json(user);
  } catch (error) {
    console.error("Error in getCurrentUser", error);
    res
      .status(500)
      .json({ message: "Internal server error", status: 500, success: false });
  }
};
