import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faSearch,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, IconButton, Input } from "@material-tailwind/react";

import { setLogout } from "@/state";
import Pomstagram from "@/components/Pomstagram";
import PawPrint from "./../../assets/pawprint.png";
import UserIcon from "./UserIcon";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user);

  return (
    <div className="sticky top-0 left-0 w-screen px-10 py-3 shadow-md flex flex-row justify-between bg-white items-center h-[70px]">
      <div
        className="flex flex-row justify-center items-center gap-2 hover:cursor-pointer"
        onClick={() => router.push("/")}>
        <Pomstagram />
        <Image
          className="w-[20px] h-[20px] rotate-[30deg]"
          src={PawPrint}
          width="20"
          height="20"
          alt=""
        />
      </div>
      {user ? (
        <>
          <div>
            <Input
              size="md"
              placeholder="Search..."
              icon={<FontAwesomeIcon icon={faSearch} />}
            />
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <UserIcon
              userName={user.userName}
              userPicturePath={`http://localhost:3001/public/${user.picturePath}`}
              size="sm"
            />
            <IconButton
              variant="text"
              onClick={() => {
                router.push("/upload");
              }}>
              <FontAwesomeIcon
                icon={faPlus}
                size="xl"
                className="text-gray-500"
              />
            </IconButton>
            <IconButton variant="text" onClick={() => dispatch(setLogout())}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                size="xl"
                className="text-gray-500"
              />
            </IconButton>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
