import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  userId: string;
  userName: string;
  emailAddress: string;
  picturePath?: string;
  likes: number;
}

export interface IPost {
  userId: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  likes: number;
}

export interface IState {
  user: IUser | null;
  token: string | null;
  posts: any[];
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
      const updatedPosts = state.posts.map((post: any) => {
        if (post._id === action.payload._id) return action.payload.post;
        return post;
      });

      state.posts = updatedPosts;
    }
  }
});

export const { setLogin, setLogout, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;