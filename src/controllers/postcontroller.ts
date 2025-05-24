import { Request, Response } from "express";
import post from "../models/Post";

export const createPost = async (req: any, res: any) => {
  try {
    const { user, content } = req.body;

    const newPost = new post({ user, content });
    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error", status:500, success:false});
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await post.find();
    res.status(200).json({ posts });
  } catch (error) {
        res.status(500).json({ message: "Internal Server error", status:500, success:false});
  }
};
