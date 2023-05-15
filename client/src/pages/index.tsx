import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";

import LoginForm from "@/components/Form/LoginForm";
import Navbar from "@/components/UI/Navbar";
import CoverGallery from "@/components/UI/CoverGallery";
import PostGallery from "@/components/UI/PostGallery";
import { parseCookie } from "@/util";

import { State, User, Post, setPosts } from "@/state";

interface Props {
  _posts: Post[] | null;
}

const Home = ({ _posts }: Props) => {
  const dispatch = useDispatch();

  const user = useSelector<State, User | null>((state) => state.user);
  const token = useSelector<State, string | null>((state) => state.token);
  const posts = useSelector<State, Post[]>((state) => state.posts);

  console.log("Token from client: " + token);

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
      const posts: Post[] = await res.json();
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
          <PostGallery posts={posts} />
        </>
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { cookies } = context.req.headers;
  // if (!cookies) {
  //   return {
  //     props: {}
  //   };
  // }
  // const parsedCookies = parseCookie(cookies);
  const { cookie } = context.req.headers;
  if (!cookie) {
    return {
      props: {
        _posts: null
      }
    };
  }

  const cookies = parseCookie(cookie);
  const { user, token } = cookies;

  if (!user || !token) {
    return {
      props: {
        _posts: null
      }
    };
  }

  const res = await fetch("http://localhost:3001/posts/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const posts: Post[] = await res.json();

  return {
    props: {
      _posts: posts
    }
  };
};
