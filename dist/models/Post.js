"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postScehma = new mongoose_1.default.Schema({
    title: { type: String, ref: "User", required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: String }],
    image: {
        data: { type: String },
        contentType: { type: String },
    },
});
const Post = mongoose_1.default.model("Post", postScehma);
exports.default = Post;
