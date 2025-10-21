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
exports.deletePost = exports.updatePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const redisClient_1 = __importDefault(require("../config/redisClient"));
// import { count } from "console";
// import { updateProfile } from "./updateProfileController";
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { description, title } = req.body;
        //read image file
        const image = req.file
            ? {
                data: req.file.buffer.toString("base64"),
                contentType: req.file.mimetype,
            }
            : undefined;
        const newPost = new Post_1.default({
            title,
            description,
            image,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
        const savedPost = yield newPost.save();
        res.status(201).json({
            post: savedPost,
            message: image
                ? "Post and image created successfully"
                : "Post saved without image",
            status: 201,
            success: true,
        });
    }
    catch (error) {
        console.error("Created post Error:", error);
        res
            .status(500)
            .json({ message: "Internal Server error", status: 500, success: false });
    }
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheKey = "all-posts";
        //try to get cache posts
        const cachePosts = yield redisClient_1.default.get(cacheKey);
        if (cachePosts) {
            return res
                .status(200)
                .json({
                posts: JSON.parse(cachePosts),
                source: "cache",
                status: 200,
                success: true,
            });
        }
        //if not in cache fetch it from db
        const posts = yield Post_1.default.find().sort({ createdAt: -1 });
        //save to redis cache for future requests (set 60s expiry)
        yield redisClient_1.default.set(cacheKey, JSON.stringify(posts), {
            EX: 60, // expires in 60 seconds
        });
        res
            .status(200)
            .json({ posts, source: "database", status: 200, success: true });
    }
    catch (error) {
        console.error("Get posts error:", error);
        res
            .status(500)
            .json({ message: "Internal Server error", status: 500, success: false });
    }
});
exports.getPosts = getPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        const foundPost = yield Post_1.default.findById(postId);
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
    }
    catch (error) {
        console.error("Get post error", error);
        res
            .status(500)
            .json({ message: "Internal Server Error", status: 500, success: false });
    }
});
exports.getPostById = getPostById;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const postId = req.params.id;
        const { title, description } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const foundPost = yield Post_1.default.findById(postId);
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
        const updatePost = yield foundPost.save();
    }
    catch (error) {
        console.error("Update post error:", error);
        res
            .status(500)
            .json({ message: "Internal Server error", status: 500, success: false });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const postId = req.params.id;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const foundPost = yield Post_1.default.findById(postId);
        if (!foundPost) {
            return res
                .status(404)
                .json({ message: "Post not found", status: 404, success: false });
        }
        yield foundPost.deleteOne();
    }
    catch (error) {
        console.error("Update post error:", error);
        res
            .status(500)
            .json({ message: "Internal Server error", status: 500, success: false });
    }
});
exports.deletePost = deletePost;
