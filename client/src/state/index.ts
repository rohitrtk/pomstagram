import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  _id: string;
  userName: string;
  emailAddress: string;
  picturePath?: string;
  likes: number;
}

export interface IPost {
  _id: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  likes: Record<string, boolean>;
}

export interface IState {
  user: IUser | null;
  token: string | null;
  posts: IPost[];
}

const initialState: IState = {
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
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post: IPost) => {
        if (post._id === action.payload.post._id) return action.payload.post
        return post;
      });

      state.posts = updatedPosts;
    }
  }
});

export const { setLogin, setLogout, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;