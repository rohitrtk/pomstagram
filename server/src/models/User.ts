import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    min: 6,
    max: 20,
    unique: true
  },
  emailAddress: {
    type: String,
    required: true,
    max: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  picturePath: {
    type: String,
    default: ""
  },
  likes: Number
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;