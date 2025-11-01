import { Request, Response } from "express";
import Like from "../models/Likes";
import Post from "../models/Post";

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // 👈 safely read the injected userId
    const { postId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if user already liked this post
    const existingLike = await Like.findOne({ user: userId, post: postId });

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      await Post.findByIdAndUpdate(postId, { $pull: { likes: existingLike._id } });
      return res.status(200).json({ message: "Post unliked successfully" });
    }

    const newLike = await Like.create({ user: userId, post: postId });
    await Post.findByIdAndUpdate(postId, { $push: { likes: newLike._id } });

    res.status(201).json({ message: "Post liked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
