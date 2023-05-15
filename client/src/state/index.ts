import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  userName: string;
  emailAddress: string;
  picturePath?: string;
  likes: number;
}

export interface Post {
  _id: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  userName: string;
  likes: Record<string, boolean>;
}

export interface State {
  user: User | null;
  token: string | null;
  posts: Post[];
}

const initialState: State = {
  user: null,
  token: null,
  posts: []
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      Cookies.set("user", JSON.stringify(state.user));
      Cookies.set("token", JSON.stringify(state.token));
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;

      Cookies.remove("user");
      Cookies.remove("token");
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post: Post) => {
        if (post._id === action.payload.post._id) return action.payload.post
        return post;
      });

      state.posts = updatedPosts;
    }
  }
});

export const { setLogin, setLogout, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;