import { Request, Response } from "express";
import Comment from "../models/Comment";

// comment

interface CommentRequest extends Request {
  postId: String;
  username: String;
  content: String;
}

export const createComment = async (req: CommentRequest, res: any) => {
  try {
    const { postId, username, content } = req.body;

    const comment = new Comment({ postId, content, username });
    const savedComment = await comment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating Comment", status: 500, success: false });
  }
};

//Get comments for specific post

export const getCommentForPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId });
    res.status(200).json({ comments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error ", status: 500, success: false });
  }
};

export const deleteComment = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res
        .status(404)
        .json({ message: "Comment not found", status: 404, success: false });
    }
    res
      .status(200)
      .json({
        message: "Comment deleted sucessfully ",
        status: 200,
        success: true,
      });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", status: 500, success: false });
  }
};
