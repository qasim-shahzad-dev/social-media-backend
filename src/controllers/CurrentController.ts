import { Request, Response } from "express";
import User from "../models/User";
import Post from "../models/Post";

interface AuthRequest extends Request {
  userId?: string;

}
export const getCurrentUser = async (req: AuthRequest, res: any) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user){
      return res
        .status(404)
        .json({ message: "User not found", status: 404, sucess: false });
      }

      const postCount = await Post.countDocuments({ user: user._id })
    res.json({
      results: {
        user:{
          _id: user._id,
          userName: user.userName,
          tagLine: user.tagLine || "",
          following: user.following.length,
          followers: user.followers.length,
          posts: postCount,
          email: user.email,
          profileImage: user.profileImage || "",
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        } ,
      },

      message: "Successfull",
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error("Error in getCurrentUser", error);
    res
      .status(500)
      .json({ message: "Internal server error", status: 500, success: false });
  }
};
