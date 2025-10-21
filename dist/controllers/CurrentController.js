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
exports.getCurrentUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const Post_1 = __importDefault(require("../models/Post"));
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userId).select("-password");
        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found", status: 404, sucess: false });
        }
        const postCount = yield Post_1.default.countDocuments({ user: user._id });
        res.json({
            results: {
                user: {
                    _id: user._id,
                    userName: user.username,
                    tagLine: user.tagLine || "",
                    following: user.following.length,
                    followers: user.followers.length,
                    posts: postCount,
                    email: user.email,
                    profileImage: user.profileImage || "",
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            },
            message: "Successfull",
            status: 200,
            success: true,
        });
    }
    catch (error) {
        console.error("Error in getCurrentUser", error);
        res
            .status(500)
            .json({ message: "Internal server error", status: 500, success: false });
    }
});
exports.getCurrentUser = getCurrentUser;
