import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/logout";

import { setLogout } from "@/state";

import PawPrint from "./../assets/pawprint.png";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user);

  return (
    <div className="fixed top-0 left-0 w-screen px-10 py-3 shadow-md flex flex-row justify-between bg-white items-center">
      <div
        className="flex flex-row justify-center items-center gap-2 hover:cursor-pointer"
        onClick={() => router.push("/")}>
        <h1 className="font-bold text-4xl text-transparent pb-2 bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 via-33% via-orange-500 via-66% to-yellow-500">
          Pomstagram
        </h1>
        <Image
          className="w-[20px] h-[20px] rotate-[30deg]"
          src={PawPrint}
          width="20"
          height="20"
          alt=""
        />
      </div>
      {user ? (
        <div className="flex flex-row justify-center items-center gap-5">
          <div className="bg-black rounded-full h-[35px] w-[35px]"></div>
          <button
            className="hover:bg-gray-300 rounded-lg p-1"
            onClick={() => dispatch(setLogout())}>
            <LogoutIcon className="" sx={{ fontSize: 35 }} />
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
