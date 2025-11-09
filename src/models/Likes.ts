import mongoose, { Schema } from "mongoose";

const likeSchema: Schema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId, required:true, ref: 'Post'
    },
},{timestamps:true});
likeSchema.index({user: 1, post :1},{unique:true}); //user can like or unlike specific post
const Likes = mongoose.model('Likes', likeSchema);
export default Likes;