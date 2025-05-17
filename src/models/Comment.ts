import mongoose, {Schema, Document, mongo } from 'mongoose';

interface IComment  {

    username:string, 
    content:string,
    createdAt: Date;
    

}

const CommentSchema: Schema<IComment> = new Schema ({

    username: {type: String, ref: 'User', required:true },
    content: {type: String, required:true },
    createdAt: { type: Date, default:Date.now }

});

const Comment = mongoose.model<IComment>('Comment', CommentSchema)
export default Comment;