import { Request, Response } from "express";
import User from "./../models/User.js";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userName } = req.params;
    const user = await User.findOne({ userName });
    console.log(user);
    res.status(200).json({ userName: user.userName, picturePath: user.picturePath, likes: user.likes });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}