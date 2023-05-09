import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "@/components/Form/LoginForm";
import Navbar from "@/components/UI/Navbar";
import CoverGallery from "@/components/UI/CoverGallery";
import PostGallery from "@/components/UI/PostGallery";

import { IState, IUser, IPost, setPosts } from "@/state";

const Home = () => {
  const dispatch = useDispatch();

  const user = useSelector<IState, IUser | null>((state) => state.user);
  const token = useSelector<IState, string | null>((state) => state.token);
  const posts = useSelector<IState, IPost[]>((state) => state.posts);

  useEffect(() => {
    if (!user) {
      return;
    }

    const getPosts = async (): Promise<void> => {
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
    <div className="w-full h-full flex flex-col justify-center items-center">
      {!user ? (
        <div className="w-3/4 grid grid-cols-2 gap-5 min-h-[520px]">
          <div className="relative collapse md:visible shadow-lg border border-gray-300 rounded-sm">
            <CoverGallery />
          </div>
          <LoginForm />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="w-full h-full p-5">
            <PostGallery posts={posts} />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
