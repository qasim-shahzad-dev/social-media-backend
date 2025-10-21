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
exports.login = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (!username)
            return res
                .status(400)
                .json({ message: "Username is required", status: 400, success: false });
        if (!email)
            return res
                .status(400)
                .json({ message: "Email is required", status: 400, success: false });
        if (!password)
            return res
                .status(400)
                .json({ message: "Password is required", status: 400, success: false });
        if (existingUser)
            return res
                .status(400)
                .json({ message: "User already exist", status: 400, success: false });
        const newUser = new User_1.default({ username, email, password });
        yield newUser.save();
        res
            .status(201)
            .json({
            message: "User created successfuly ",
            status: 201,
            sucess: true,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal server error", status: 500, success: false });
    }
});
exports.signup = signup;
//login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res
                .status(400)
                .json({
                message: "Invalid Email!, Please Provide correct email ",
                status: 400,
                success: false,
            });
        const isMatch = yield user.comparePassword(password);
        if (!isMatch)
            return res
                .status(400)
                .json({ message: "invalid Credential", status: 400, success: false });
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res;
        res.status(200).json({
            results: {
                token: token,
            },
            message: "User logged in successfully",
            status: 200,
            success: true,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Internal server error", status: 500, success: false });
    }
});
exports.login = login;
