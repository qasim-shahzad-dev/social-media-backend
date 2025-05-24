import { Request, Response } from "express";
import Comment from "../models/Comment";
import Post from "../models/Post";

// comment

interface CommentRequest {
  postId: String;
  username: String;
  content: String;
}

export const createComment = async (req: Request, res: any) => {
  try {
    const { postId, username, content } = req.body;

    const comment = new Comment({ postId, content, username });
    const savedComment = await comment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: "Error creating Comment", status:500, success:false });
  }
};

//Get comments for specific post

export const getCommentForPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: "Internal server error " ,status:500, success:false});
  }
};
