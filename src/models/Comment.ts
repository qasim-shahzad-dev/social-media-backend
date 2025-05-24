import mongoose, { Schema, Document, mongo } from "mongoose";

interface IComment {
  postId: mongoose.Types.ObjectId;
  username: string;
  content: string;
  createdAt: Date;
}

const CommentSchema: Schema<IComment> = new Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  username: { type: String, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model<IComment>("Comment", CommentSchema);
export default Comment;
