"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleLike = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const toggleLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.postId;
        const userId = req.body.userId;
        const post = yield Post_1.default.findById(postId);
        if (!post)
            return res
                .status(404)
                .json({ message: "Post not found", status: 404, success: false });
        const userIndex = post.likes.indexOf(userId);
        if (userIndex === -1) {
            post.likes.push(userId);
        }
        else {
            post.likes.splice(userIndex, 1);
        }
        yield post.save();
        res.status(200).json({
            sucess: true,
            message: userIndex === -1 ? "PostLiked" : "Post unliked",
            LikesCount: post.likes.length,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "internal server error", status: 500, success: false });
    }
});
exports.toggleLike = toggleLike;
