import { Request, Response } from "express";
import User, { IUser } from "../models/User";

interface AuthRequest extends Request {
  userId?: string;
}

export const updateProfile = async (req: AuthRequest, res: any) => {
  try {
    const { username, profileImage, tagline } = req.body;

    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized: No user ID found in token",
        status: 401,
        success: false,
      });
    }
    const user = await User.findById(req.userId);
    const userDoc = user as IUser;

    if (username) {
      userDoc.userName = username;
    }

    if (profileImage) {
      const isBase64Image = /^data:image\/(png|jpeg|jpg|gif);base64,/.test(
        profileImage
      );
      if (!isBase64Image) {
        return res.status(400).json({
          message: "Invalid image format (must be base64)",
          status: 400,
          success: false,
        });
      }
      userDoc.profileImage = profileImage;
    }

    if (tagline) {
      userDoc.tagLine = tagline;
    }

    await userDoc.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      status: 200,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      message: "Internal server error",
      status: 500,
      success: false,
    });
  }
};
