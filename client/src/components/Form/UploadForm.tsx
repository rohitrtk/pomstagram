import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea, Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { setPosts, State, User } from "@/state";

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
  const token = useSelector<State, string | null>((state) => state.token);
  const user = useSelector<State, User | null>((state) => state.user);

  if (!user) {
    router.push("/login");
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
    setError
  } = useForm<FormValues>({ resolver: yupResolver(uploadSchema) });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setValue("picture", acceptedFiles[0]);
    clearErrors();
  }, []);

  const onSubmit = async () => {
    const formData = new FormData();

    const { picture, description } = getValues();
    formData.append("picturePath", picture!.name);
    formData.append("description", description);
    formData.append("userId", user!._id);
    formData.append("userName", user!.userName);
    formData.append("picture", picture!);

    const res = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    if (res.status === 205) {
      console.log("Not a pomeranian!");
      setError("picture", {
        message:
          "Are you sure this photo is of a Pomeranian? Please make sure your Pomeranian is clearly visible!"
      });
    } else {
      const posts = await res.json();
      dispatch(setPosts({ posts }));
      clearErrors();
      reset();
    }
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-3 w-full">
        <div
          {...getRootProps({ className: "dropzone" })}
          className={`flex flex-col h-auto w-full p-2 ${
            errors["picture"]
              ? "border-2 border-red-500"
              : "border border-gray-300"
          } rounded-md text-gray-500 text-center justify-center items-center`}>
          <input {...getInputProps()} className="w-full" />
          {!getValues().picture ? (
            <Typography className="min-w-[36px] min-h-[96px]">
              Drag & drop your photo here
            </Typography>
          ) : (
            <Image
              src={URL.createObjectURL(getValues().picture!)}
              alt=""
              width="360"
              height="480"
            />
          )}
          <ErrorMessage
            errors={errors}
            name="picture"
            render={({ message }) => (
              <p className="text-red-500 text-xs">{message}</p>
            )}
          />
        </div>

        <div className="w-full">
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
