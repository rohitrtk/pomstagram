import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { IPost, IState, IUser, setPosts, setPost } from "@/state";
import PostCard from "./PostCard";

const HomeGallery = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector<IState, string | null>((state) => state.token);
  const user = useSelector<IState, IUser | null>((state) => state.user);
  const posts = useSelector<IState, IPost[]>((state) => state.posts);

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

      const posts: IPost[] = await res.json();
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
