import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Navbar from "@/components/UI/Navbar";
import UserIcon from "@/components/UI/UserIcon";
import { Typography } from "@material-tailwind/react";
import UserCard from "@/components/UI/UserCard";
import PostGallery from "@/components/UI/PostGallery";
import { IPost } from "@/state";

interface IProfileData {
  _id: string;
  userName: string;
  picturePath: string;
  numLikes: number;
  numPosts: number;
  posts: IPost[];
}

const Profile = () => {
  const router = useRouter();
  const { userName } = router.query;

  // Seperate user data state away from redux because we want user data pertaining
  // to the user being looked up, not necessarily the user that's logged in.
  const [userData, setUserData] = useState<IProfileData | null>(null);

  const token = useSelector((state) => (state as any).token);

  const getUser = async () => {
    try {
      let res = await fetch(`http://localhost:3001/users/${userName}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

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
      console.log(userData);
    } catch (err) {
      setUserData(null);
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <Navbar />
      <div className="mt-5 flex flex-col w-full justify-center items-center">
        {!userData ? (
          <Typography>
            We&apos;re sorry, the user you&apos;re searching for doesn&apos;t
            exist.
          </Typography>
        ) : (
          <>
            <UserCard
              userName={userName as string}
              userPicturePath={userData.picturePath}
              numLikes={userData.numLikes}
              numPosts={userData.numPosts}
            />
            <PostGallery posts={userData.posts} />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
