
import { Request, Response } from "express";
import post from '../models/Post';

export const createPost = async (req: Request, res: Response) => {
    try{
        const content = req.body;
        const user = req.userId;

        const newPost = new post({user,content});
        const savedPost = await newPost.save();

        res.status(201).json(savedPost);

    } catch(error) {
        res.status(500).json({message:'Internal Server error', error:505})
    }
};

export const getPosts = async (req:Request, res:Response) => {
    try{ 

     const posts = await post.find().populate('user','username email');
     res.status(200).json({posts});
    
    }catch (error) {
     res.status(500).json({message:'Internal Server error', error:505})

    }
};
