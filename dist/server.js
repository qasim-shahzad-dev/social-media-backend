"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const auth_1 = __importDefault(require("./routes/auth"));
const post_1 = __importDefault(require("./routes/post"));
const Comment_1 = __importDefault(require("./routes/Comment"));
const like_1 = __importDefault(require("./routes/like"));
const Current_1 = __importDefault(require("./routes/Current"));
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
const updateProfile_1 = __importDefault(require("./routes/updateProfile"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
//routes
app.use("/api/auth", auth_1.default); // excuding middleware in signup,signin
app.use(authMiddleware_1.default);
app.use("/api/auth", Current_1.default);
app.use("/api/post", post_1.default);
app.use("/api/comments", Comment_1.default);
app.use("/api/likes", like_1.default);
app.use("/api/user", updateProfile_1.default);
//Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
