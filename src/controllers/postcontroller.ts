import { Request, Response } from "express";
import post from "../models/Post";
import redisClient from "../config/redisClient";

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


interface CustomRequest extends Request {
  user?:{
    id:string,
    email:string,
  }
}

export const getPosts = async (req:CustomRequest , res: any) => {
  try {
    const cacheKey = "all-posts";

    //try to get cache posts

    const cachePosts = await redisClient.get(cacheKey);
    if(cachePosts) {
      return res.status(200).json({posts:JSON.parse(cachePosts), source:"cache", status:200, success:true});
    };

    //if not in cache fetch it from db


    const posts = await post.find().sort({createdAt: -1});
    //save to redis cache for future requests (set 60s expiry)
   await redisClient.set(cacheKey, JSON.stringify(posts), {
  EX: 60, // expires in 60 seconds
});
    res.status(200).json({ posts,source:"database",status:200, success:true });
  } catch (error) {
    console.error("Get posts error:", error);
    
    res
      .status(500)
      .json({ message: "Internal Server error", status: 500, success: false });
  }
};
