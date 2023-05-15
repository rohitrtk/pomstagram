import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Card, Typography } from "@material-tailwind/react";

import UploadForm from "@/components/Form/UploadForm";
import Navbar from "@/components/UI/Navbar";

import { State, User } from "@/state";

const Upload = () => {
  const router = useRouter();
  const user = useSelector<State, User | null>((state) => state.user);

  if (!Boolean(user)) {
    router.push("/");
    return <></>;
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center text-center bg-white">
      <Navbar />
      <div className="flex flex-col p-5 justify-center items-center w-full h-full">
        <Card
          color="transparent"
          shadow={true}
          className="p-5 gap-5 flex flex-col items-center justify-center text-center">
          <Typography className="text-4xl" color="blue-gray">
            Upload a photo!
          </Typography>

          <UploadForm />
        </Card>
      </div>
    </div>
  );
};

export default Upload;
