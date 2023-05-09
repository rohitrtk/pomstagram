import { Request, Response } from "express";
import Post from "./../models/Post.js";
import User from "./../models/User.js";

export const createPost = async (req: Request, res: Response) => {
  console.log(`Create post\nReq: ${JSON.stringify(req.body)}\nRes: ${res}\n`);
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post({
      userId,
      userName: user.userName,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
    });

    await newPost.save();

    const post = await Post.find();

    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}

export const getFeedPosts = async (req: Request, res: Response) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const likePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const liked = post.likes.get(userId);

    if (liked) {
      console.log("1");
      post.likes.delete(userId as string);
    } else {
      console.log(req.body);
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}