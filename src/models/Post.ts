import mongoose,{Schema, Document, Date} from "mongoose";

interface IPost extends Document {
    
    user:mongoose.Schema.Types.ObjectId;
    content: string;
    createdAt: Date;
}

const postScehma: Schema<IPost> = new Schema ({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    content: {type: String, required:true},
    createdAt: {type: Date, default:Date.now}

});

const Post = mongoose.model<IPost>('Post',postScehma);
export default Post;