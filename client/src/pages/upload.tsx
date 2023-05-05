import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { Card, Typography } from "@material-tailwind/react";

import UploadForm from "@/components/Form/UploadForm";

import Navbar from "@/components/UI/Navbar";

const Upload = () => {
  const router = useRouter();
  const user = useSelector((state: any) => state.user);

  if (!user) {
    return <>No user</>;
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center text-center">
      <Navbar />
      <div className="p-5">
        <Card color="transparent" shadow={true} className="p-5 gap-5">
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
