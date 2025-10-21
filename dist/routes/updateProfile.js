"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const updateProfileController_1 = require("../controllers/updateProfileController");
const router = express_1.default.Router();
router.put("/update-profile", updateProfileController_1.updateProfile);
exports.default = router;
