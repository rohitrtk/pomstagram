import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { Post, State, User, setPosts, setPost } from "@/state";
import PostCard from "./PostCard";

const HomeGallery = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector<State, string | null>((state) => state.token);
  const user = useSelector<State, User | null>((state) => state.user);
  const posts = useSelector<State, Post[]>((state) => state.posts);

  useEffect(() => {
    if (!user) {
      return;
    }

    const getPosts = async () => {
      const res = await fetch("http://localhost:3001/posts/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const posts: Post[] = await res.json();
      dispatch(setPosts({ posts }));
    };

    getPosts();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-5 h-full overflow-x-hidden overflow-y-scroll">
      {posts ? (
        posts.map((post, i) => {
          return (
            <div key={i}>
              <PostCard {...post} />
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default HomeGallery;
