import { Request, Response } from "express";
import Post from "../models/Post";
interface IlikeRequest {
  params: { postId: string };
  body: { userId: string };
}

export const toggleLike = async (req: IlikeRequest, res: any) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId;

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", status: 404, success: false });

    const userIndex = post.likes.indexOf(userId);

    if (userIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(userIndex, 1);
    }
    await post.save();
    res.status(200).json({
      sucess: true,
      message: userIndex === -1 ? "PostLiked" : "Post unliked",
      LikesCount: post.likes.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", status: 500, success: false });
  }
};
