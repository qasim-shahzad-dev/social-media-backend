import { Request, Response } from "express";
import post from "../models/Post";
import { title } from "process";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const { title } = req.body;

    //read image file
    const image = req.file
      ? {
          data: req.file.buffer.toString("base64"),
          contentType: req.file.mimetype,
        }
      : undefined;

    const newPost = new post({ title: title, description, image });

    const savedPost = await newPost.save();
    res.status(201).json({
      post: savedPost,
      message: image
        ? "Post and image created successfully"
        : "Post saved without image",
      status: 201,
      success: true,
    });
  } catch (error) {
    console.error("Created post Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server error", status: 500, success: false });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await post.find();
    res.status(200).json({ posts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", status: 500, success: false });
  }
};
