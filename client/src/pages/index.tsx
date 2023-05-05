import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { IState, IUser } from "@/state";
import LoginForm from "@/components/Form/LoginForm";
import Navbar from "@/components/UI/Navbar";
import CoverGallery from "@/components/UI/CoverGallery";
import HomeGallery from "@/components/UI/HomeGallery";

const Home = () => {
  const router = useRouter();
  const user = useSelector<IState, IUser | null>((state) => state.user);

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
            <HomeGallery />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
