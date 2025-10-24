import mongoose, { Schema } from "mongoose";

const followSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    target:{type: Schema.Types.ObjectId, required:true, ref:"User"},
});

const Follow = mongoose.model("Follow", followSchema);
export default Follow;