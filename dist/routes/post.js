"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postcontroller_1 = require("../controllers/postcontroller");
const multerConfig_1 = __importDefault(require("../utils/multerConfig"));
const router = express_1.default.Router();
router.post("/createPost", multerConfig_1.default.single("image"), postcontroller_1.createPost);
router.get("/getPosts", postcontroller_1.getPosts);
router.get("/getPost/:id", postcontroller_1.getPostById);
router.put("/updatePost/:id", multerConfig_1.default.single("image"), postcontroller_1.updatePost);
router.delete("/deletePost/:id", postcontroller_1.deletePost);
exports.default = router;
