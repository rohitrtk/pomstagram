import Image from "next/image";
import RegisterForm from "@/components/RegisterForm";

import CoverPhoto from "./../assets/coverPhoto.jpeg";
import Navbar from "@/components/Navbar";

const Register = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Navbar />
      <div className="w-3/4 grid grid-cols-2">
        <Image
          className="w-full h-full shadow-md rounded-lg"
          src={CoverPhoto}
          alt=""
          width="1920"
          height="1080"
        />
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
