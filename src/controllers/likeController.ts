
import { Request, Response } from "express";
import Post from "../models/Post";
interface IlikeRequest {
    params: { postId: string },
    body: { userId: string }
}

export const toggleLike = async (req: IlikeRequest, res: any) => {

    try {
        const postId = req.params.postId;
        const userId = req.body.userId;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const alreadyLike = 

        post.likes += 1;
        await post.save();

        res.status(200).json({
            message: "Post liked successfully",
            success: true,
            likes: post.likes,
        });

    } catch (error) {

        res.status(500).json({ message: 'internal server error', error, success: false })
    }
};