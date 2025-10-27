// import { NextFunction, Request, Response } from "express";
// import Follow from "../models/follow";
// import Post from "../models/Post";


// const follow = async(req:Request, res:Request, next:NextFunction) => {
//     try {
        
//         const follows = await Follow.find({user: req.user.id});
//         const follwing = follows.map(follow => follow.target);
//         const feed = await Post.find
//     } catch (error) {
//         next(error)
//     }
// }