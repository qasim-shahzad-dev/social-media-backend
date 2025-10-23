import { Request, Response } from "express";
import post from "../models/Post";
// import redisClient from "../config/redisClient";
// import { count } from "console";
// import { updateProfile } from "./updateProfileController";

export const createPost = async (req: CustomRequest, res: Response) => {
  try {
    const { description, title } = req.body;

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
      userId: req.user?.id,
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

interface CustomRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const getPosts = async (req: CustomRequest, res: any) => {
  try {
    // const cacheKey = "all-posts";

    //try to get cache posts

    // const cachePosts = await redisClient.get(cacheKey);
    // if (cachePosts) {
    //   return res
    //     .status(200)
    //     .json({
    //       posts: JSON.parse(cachePosts),
    //       source: "cache",
    //       status: 200,
    //       success: true,
    //     });
    // }

    //if not in cache fetch it from db

    const posts = await post.find().sort({ createdAt: -1 });
    //save to redis cache for future requests (set 60s expiry)
    // await redisClient.set(cacheKey, JSON.stringify(posts), {
    //   EX: 60, 
    // });
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
    const userId = req.user?.id;

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
    const updatePost = await foundPost.save();
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
    const userId = req.user?.id;

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
