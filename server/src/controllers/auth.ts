import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./../models/User.js";

export const register = async (req, res) => {
  try {
    const { userName, emailAddress, password, picturePath, likes } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      emailAddress,
      password: passwordHash,
      picturePath,
      likes
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const login = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    const user = await User.findOne({ emailAddress });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ msg: "Invalid password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
