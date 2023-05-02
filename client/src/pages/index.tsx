import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";

const Home = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Navbar />
      {!user ? (
        <div className="w-[37.5%]">
          <LoginForm />
        </div>
      ) : (
        <>home</>
      )}
    </div>
  );
};

export default Home;
