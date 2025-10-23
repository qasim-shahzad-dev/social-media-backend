import mongoose, { Schema, Document, Date } from "mongoose";

interface IPost extends Document {
  title: string;
  description: string;
  createdAt: Date;
  comment:string;
  likes: string[];
  image: {
    data: string;
    contentType: string;
  };
}

const postScehma: Schema<IPost> = new mongoose.Schema({
  title: { type: String, ref: "User", required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: String, reh: "Likes" }],
  image: {
    data: { type: String },
    contentType: { type: String },
  },
  comment: {type: String, ref:"Comment"}
});

const Post = mongoose.model<IPost>("Post", postScehma);
export default Post;
