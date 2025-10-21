"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        res
            .status(401)
            .json({ message: "No token, authorization denied", status: 401, success: false });
        return; // ✅ Only return if token is missing
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.userId,
            email: decoded.email,
        };
        next(); // ✅ Valid token
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token", status: 401, success: false });
        return; // ✅ Only return if token is invalid
    }
};
exports.default = authMiddleware;
