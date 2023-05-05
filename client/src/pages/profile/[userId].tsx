import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Navbar from "@/components/UI/Navbar";

const Profile = () => {
  const [user, setUser] = useState();

  const router = useRouter();
  const { userId } = router.query;

  const token = useSelector((state) => (state as any).token);

  const getUser = async () => {
    const res = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Navbar />
    </div>
  );
};

export default Profile;
