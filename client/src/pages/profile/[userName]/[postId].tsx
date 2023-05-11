import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/UI/Navbar";
import PostCard from "@/components/UI/PostCard";

import { useDispatch, useSelector } from "react-redux";

import { IPost, IState, IUser } from "@/state";
import { Spinner } from "@material-tailwind/react";

const Post = () => {
  const router = useRouter();
  const { postId, userName } = router.query;

  const token = useSelector<IState, string | null>((state) => state.token);
  const user = useSelector<IState, IUser | null>((state) => state.user);

  const [postData, setPostData] = useState<IPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`http://localhost:3001/posts/${postId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.status === 404) {
          setLoading(false);
        }

        const post = await res.json();
        setPostData({ ...post });
      } catch (err) {
        setPostData(null);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, []);

  return (
    <div className="w-full h-full flex-col justify-start items-center">
      <Navbar />
      <div className="mt-5 flex flex-col w-full h-full justify-start items-center">
        {loading ? (
          <Spinner />
        ) : postData ? (
          <div className="w-1/3 h-5/8">
            <PostCard {...postData} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Post;
