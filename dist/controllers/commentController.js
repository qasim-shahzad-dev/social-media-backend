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
exports.deleteComment = exports.getCommentForPost = exports.createComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, username, content } = req.body;
        const comment = new Comment_1.default({ postId, content, username });
        const savedComment = yield comment.save();
        res.status(201).json(savedComment);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error creating Comment", status: 500, success: false });
    }
});
exports.createComment = createComment;
//Get comments for specific post
const getCommentForPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const comments = yield Comment_1.default.find({ postId });
        res.status(200).json({ comments });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal server error ", status: 500, success: false });
    }
});
exports.getCommentForPost = getCommentForPost;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedComment = yield Comment_1.default.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res
                .status(404)
                .json({ message: "Comment not found", status: 404, success: false });
        }
        res
            .status(200)
            .json({
            message: "Comment deleted sucessfully ",
            status: 200,
            success: true,
        });
    }
    catch (error) {
        console.error("Error deleting comment:", error);
        res
            .status(500)
            .json({ message: "Internal Server Error", status: 500, success: false });
    }
});
exports.deleteComment = deleteComment;
