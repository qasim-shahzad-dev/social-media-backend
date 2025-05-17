import { Request, Response } from "express";
import Comment from "../models/Comment";
import Post from "../models/Post";
import { SlowBuffer } from "buffer";

// comment

interface CommentRequest {

    username: String,
    content: String,
}

export const createComment  = async ( req: Request, res: any) => {

    
    try {
        const {   username, content} = req.body;

        const comment = new Comment({ content,username});
        const savedComment = await comment.save();

        res.status(201).json(savedComment);


    } catch (error) {

        res.status(500).json({ message: "Error creating Comment", error })

    }

}