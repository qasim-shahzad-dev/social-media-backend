import mongoose,{Schema, Document, Date} from "mongoose";

interface IPost extends Document {
    
    user:string,
    content: string;
    createdAt: Date;
    likes: number,
}

const postScehma: Schema<IPost> = new mongoose.Schema ({
    user: {type: String, ref: 'User', required:true},
    content: {type: String, required:true},
    createdAt: {type: Date, default:Date.now},
    likes: { type: Number, default:0 }

});

const Post = mongoose.model<IPost>('Post',postScehma);
export default Post;