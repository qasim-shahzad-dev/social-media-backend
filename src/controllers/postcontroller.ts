import { Request, Response } from "express";
import post from "../models/Post";
// import redisClient from "../config/redisClient";
// import { count } from "console";
// import { updateProfile } from "./updateProfileController";
interface CustomRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const createPost = async (req: CustomRequest, res: Response) => {

  try {
    const { description, title } = req.body;
    if(!description  || !title){
      throw new Error ("Invalid Inputs")
    }
    //read image file
    const image = req.file
      ? {
          data: req.file.buffer.toString("base64"),
          contentType: req.file.mimetype,
        }
      : undefined;

    const newPost = new post({
      title,
      description,
      image : image ?? '',
      author: req.user?.id,
    });

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


export const getPosts = async (req: CustomRequest, res: any) => {
  try {
    const {user} = req.user?.id as any;
    if(!user){
      throw new Error ("User is undefined")
    }
    const posts = await post.find(user).sort({ createdAt: -1 });
    res
      .status(200)
      .json({ posts, source: "database", status: 200, success: true });
  } catch (error) {
    console.error("Get posts error:", error);

    res
      .status(500)
      .json({ message: "Internal Server error", status: 500, success: false });
  }
};

export const getPostById = async (req: CustomRequest, res: any) => {
  try {
    const postId = req.params.id;
    const foundPost = await post.findById(postId);

    if (!foundPost) {
      return res
        .status(404)
        .json({ message: "Post not found", status: 404, success: false });
    }
    res
      .status(200)
      .json({
        post: foundPost,
        message: "Post fetched scuccessfully ",
        status: 200,
        success: true,
      });
  } catch (error) {
    console.error("Get post error", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", status: 500, success: false });
  }
};

export const updatePost = async (req: CustomRequest, res: any) => {
  try {
    const postId = req.params.id;
    const { title, description } = req.body;
    // const userId = req.user?.id;

    const foundPost = await post.findById(postId);
    if (!foundPost) {
      return res
        .status(404)
        .json({ message: "Post not found", status: 404, success: false });
    }
    // image can also be updated
    const image = req.file
      ? {
          data: req.file.buffer.toString("base64"),
          contentType: req.file.mimetype,
        }
      : foundPost.image;

    foundPost.title = title || foundPost.title;
    foundPost.description = description || foundPost.description;
    foundPost.image = image;
    await foundPost.save();
  } catch (error) {
    console.error("Update post error:", error);
    res
      .status(500)
      .json({ message: "Internal Server error", status: 500, success: false });
  }
};

export const deletePost = async (req: CustomRequest, res: any) => {
  try {
    const postId = req.params.id;
    // const userId = req.user?.id;

    const foundPost = await post.findById(postId);
    if (!foundPost) {
      return res
        .status(404)
        .json({ message: "Post not found", status: 404, success: false });
    }

    await foundPost.deleteOne();
  } catch (error) {
    console.error("Update post error:", error);
    res
      .status(500)
      .json({ message: "Internal Server error", status: 500, success: false });
  }
};
