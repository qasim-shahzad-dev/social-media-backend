import mongoose, { Schema, Document, Date, ObjectId } from "mongoose";

interface IPost extends Document {
  creator:Schema.Types.ObjectId
  title: string;
  description: string;
  createdAt: Date;
  comment: string;
  likes: string[];
  image: {
    data: string;
    contentType: string;
  };
}

const postScehma: Schema<IPost> = new mongoose.Schema({
  creator: { type: Schema.Types.ObjectId, reuqired: true, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: String, reh: "Likes" }],
  image: {
    data: { type: String },
    contentType: { type: String },
  },
  comment: { type: String, ref: "Comment" }
});

const Post = mongoose.model<IPost>("Post", postScehma);
export default Post;
