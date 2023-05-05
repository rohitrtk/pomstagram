import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Navbar from "@/components/UI/Navbar";
import UserIcon from "@/components/UI/UserIcon";
import { Typography } from "@material-tailwind/react";
import UserCard from "@/components/UI/UserCard";

const Profile = () => {
  const router = useRouter();
  const { userName } = router.query;
  const [userData, setUserData] = useState<{
    userName: string;
    picturePath: string;
    likes: number;
  } | null>(null);

  const token = useSelector((state) => (state as any).token);

  const getUser = async () => {
    const res = await fetch(`http://localhost:3001/users/${userName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setUserData(data);
    console.log(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!userData) return <></>;

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <Navbar />
      <div className="mt-5 flex flex-col w-full justify-center items-center">
        <UserCard
          userName={userName as string}
          userPicturePath={userData!.picturePath}
          numLikes={userData!.likes}
          numPosts={0}
        />
      </div>
    </div>
  );
};

export default Profile;
