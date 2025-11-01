import mongoose, { Schema } from "mongoose";


const postScehma: Schema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Likes" }],
  image: {
    data: { type: String },
    contentType: { type: String },
  },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }
});

postScehma.pre('save', async function(){  
  try {
    // find user doc and update its post arrya with the newone
     await mongoose.model('User').findByIdAndUpdate(
      this.author,
      {$push:{ posts: this._id}},
      {new : true}
    );
  } catch (error) {
    console.error(error); 
  }
})
const Post = mongoose.model("Post", postScehma);
export default Post;
