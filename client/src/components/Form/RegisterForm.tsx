import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Pomstagram from "@/components/Pomstagram";
import FormTextInput from "./FormTextInput";
import { Button, Typography } from "@material-tailwind/react";

const registerSchema = yup.object().shape({
  userName: yup.string().required("Required"),
  emailAddress: yup.string().required("Required"),
  password: yup.string().required("Required"),
  picture: yup.string().required("Required")
});

interface FormValues {
  userName: string;
  emailAddress: string;
  password: string;
  picture: File | null;
  terms: boolean;
}

const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(registerSchema) });

  const onDrop = useCallback((acceptedFiles: any) => {
    setValue("picture", acceptedFiles[0]);
  }, []);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    const { userName, emailAddress, picture, password } = getValues();
    formData.append("userName", userName);
    formData.append("emailAddress", emailAddress);
    formData.append("password", password);
    formData.append("picturePath", picture!.name);
    formData.append("picture", picture!);

    const res = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      body: formData
    });

    const savedUser = await res.json();
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
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="m-auto flex flex-col justify-center items-center gap-5 border border-gray-300 rounded-sm shadow-lg p-5 h-full">
        <div className="w-full flex flex-col justify-center items-center text-center gap-2">
          <Pomstagram />
          <Typography>Sign up to see cute pictures of Pomeranians!</Typography>
        </div>

        <FormTextInput
          name="userName"
          placeholder="Username"
          type="text"
          register={register}
          errors={errors}
        />

        <FormTextInput
          name="emailAddress"
          placeholder="Email Address"
          type="email"
          register={register}
          errors={errors}
        />

        <FormTextInput
          name="password"
          placeholder="Password"
          type="password"
          register={register}
          errors={errors}
        />

        <div
          {...getRootProps({ className: "dropzone" })}
          className="flex flex-col h-auto w-2/3 p-2 border-gray-300 border rounded-md text-gray-500 text-center justify-center items-center">
          <input {...getInputProps()} />
          {!getValues().picture ? (
            <p className="">Drag & drop your profile photo here</p>
          ) : (
            <p>{getValues().picture!.name}</p>
          )}
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              {...register("terms", {
                required: "Please accept terms & conditions"
              })}
            />
            <label htmlFor="terms">Accept terms and conditions</label>
          </div>
          <ErrorMessage
            errors={errors}
            name="terms"
            render={({ message }) => (
              <p className="text-red-500 text-xs">{message}</p>
            )}
          />
        </div>

        <Button className="border rounded-md p-2 w-1/2" type="submit">
          Register
        </Button>
        <Typography
          color="blue"
          size="small"
          className="hover:underline cursor-pointer"
          onClick={() => router.push("/")}>
          Already have an account? Log in here!
        </Typography>
      </div>
    </form>
  );
};

export default RegisterForm;
