import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Navbar from "@/components/UI/Navbar";
import UserIcon from "@/components/UI/UserIcon";
import { Typography, Spinner } from "@material-tailwind/react";
import UserCard from "@/components/UI/UserCard";
import PostGallery from "@/components/UI/PostGallery";
import { Post } from "@/state";

interface IProfileData {
  _id: string;
  userName: string;
  picturePath: string;
  numLikes: number;
  numPosts: number;
  posts: Post[];
}

const Profile = () => {
  const router = useRouter();
  const { userName } = router.query;

  // Seperate user data state away from redux because we want user data pertaining
  // to the user being looked up, not necessarily the user that's logged in.
  const [userData, setUserData] = useState<IProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const token = useSelector((state) => (state as any).token);

  const getUser = async () => {
    try {
      let res = await fetch(`http://localhost:3001/users/${userName}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.status === 404) {
        setUserData(null);
        setLoading(false);
        return;
      }

      let data = await res.json();
      let userData: IProfileData = { ...data };

      res = await fetch(`http://localhost:3001/posts/${userData._id}/posts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      data = await res.json();

      userData = { ...userData, posts: [...data] };
      setUserData(userData);
    } catch (err) {
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <Navbar />
      <div className="mt-10 flex flex-col w-full h-full justify-start items-center">
        {loading ? (
          <Spinner />
        ) : !userData ? (
          <Typography>
            We&apos;re sorry, the user you&apos;re searching for doesn&apos;t
            exist.
          </Typography>
        ) : (
          <div className="pt-10 flex flex-col justify-start items-center">
            <UserCard
              userName={userName as string}
              userPicturePath={userData.picturePath}
              numLikes={userData.numLikes}
              numPosts={userData.numPosts}
            />
            <div className="p-5">
              <PostGallery posts={userData.posts} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
