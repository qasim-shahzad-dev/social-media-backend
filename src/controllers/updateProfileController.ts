import { Request, Response } from "express";
import User, { IUser } from "../models/User";

export const updateProfile = async (req: Request, res: any) => {
  try {
    const { username, profileImage, tagline } = req.body;
    if (!username) {
      return res
        .status(400)
        .json({
          message: "please provide Username",
          status: 400,
          success: false,
        });
    }
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ message: "user does not exists", status: 400, success: false });
    }
    const userDoc = user as IUser;

    if (profileImage) {
      const isBase64Image = /^data:image\/(png|jpeg|jpg|gif);base64,/.test(
        profileImage
      );
      if (!isBase64Image) {
        return res
          .status(400)
          .json({ error: "Invalid image format (must be base64)" });
      }
      userDoc.profileImage = profileImage;
    }

    if (tagline) userDoc.tagline = tagline;
    await userDoc.save();
    res.status(200).json({
      message: "Profile updated successfully",
      success:true,
      status:200,
    });
    if (!tagline)
    return  res.status(400).json({message: "Please provide tagline", status: 400, success: false})
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", status: 500, success: true });
  }
};
