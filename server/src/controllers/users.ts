import { Request, Response } from "express";
import User from "./../models/User.js";
import Post from "./../models/Post.js";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName });

    const userPosts = await Post.find({ userName });
    const numPosts = userPosts ? userPosts.length : 0;

    const userLikes = `likes.${user.id}`;
    const likedPosts = await Post.find({ userLikes: true });
    const numLikes = likedPosts ? likedPosts.length : 0;

    res.status(200).json({ _id: user.id, userName: user.userName, picturePath: user.picturePath, likes: user.likes, numPosts, numLikes });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}