import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea, Button } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { setPosts, IState, IUser } from "@/state";

interface FormValues {
  picture: File | null;
  description: string;
}

const uploadSchema = yup.object().shape({
  picture: yup.mixed().required("Please select an image"),
  description: yup.string()
});

const UploadForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector<IState, string | null>((state) => state.token);
  const user = useSelector<IState, IUser | null>((state) => state.user);

  if (!user) {
    router.push("/login");
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(uploadSchema) });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setValue("picture", acceptedFiles[0]);
  }, []);

  const onSubmit = async () => {
    const formData = new FormData();

    const { picture, description } = getValues();
    formData.append("picture", picture!);
    formData.append("picturePath", picture!.name);
    formData.append("description", description);
    formData.append("userId", user!._id);

    const res = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const posts = await res.json();
    dispatch(setPosts({ posts }));

    reset();
  };

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpg": [],
        "image/jpeg": [],
        "image/png": []
      },
      onDrop
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="flex flex-col justify-center items-center gap-3">
        <div
          {...getRootProps({ className: "dropzone" })}
          className="flex flex-col h-auto w-2/3 p-2 border-gray-300 border rounded-md text-gray-500 text-center justify-center items-center">
          <input {...getInputProps()} />
          {!getValues().picture ? (
            <p className="">Drag & drop your profile photo here</p>
          ) : (
            <Image
              src={URL.createObjectURL(getValues().picture!)}
              alt=""
              width="360"
              height="480"
            />
          )}
        </div>

        <div className={`w-full`}>
          <Textarea label="Description..." {...register("description")} />
        </div>

        <div className="w-2/3">
          <Button type="submit">Upload</Button>
        </div>
      </div>
    </form>
  );
};

export default UploadForm;
