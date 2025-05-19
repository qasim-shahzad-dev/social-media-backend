import mongoose,{Schema, Document, Date} from "mongoose";

interface IPost extends Document {
    
    user:string,
    content: string;
    createdAt: Date;
    likes: [string],
}

const postScehma: Schema<IPost> = new Schema ({
    user: {type: String, ref: 'User', required:true},
    content: {type: String, required:true},
    createdAt: {type: Date, default:Date.now},
    likes: { type: [String], default:[] }

});

const Post = mongoose.model<IPost>('Post',postScehma);
export default Post;