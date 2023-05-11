import { Request } from "express";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  userName: String,
  description: String,
  picturePath: String,
  userPicturePath: String,
  likes: {
    type: Map,
    of: Boolean
  }
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;