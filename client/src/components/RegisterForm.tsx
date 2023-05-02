import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const registerSchema = yup.object().shape({
  userName: yup.string().required("required"),
  emailAddress: yup.string().required("required"),
  password: yup.string().required("required"),
  picture: yup.string().required("required")
});

interface FormValues {
  userName: string;
  emailAddress: string;
  password: string;
  picture: File | null;
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="m-auto flex flex-col justify-center items-center gap-5 [&>input]:border [&>input]:rounded-md [&>input]:border-gray-300 [&>input]:p-2 border border-gray-300 rounded-lg shadow-lg p-5">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <h1 className="text-4xl font-bold">Pomstagram</h1>
          <p>Sign up to see cute pictures of Pomeranians!</p>
        </div>
        <input
          className="w-2/3"
          {...register("userName")}
          placeholder="Username"
        />
        <input
          className="w-2/3"
          {...register("emailAddress")}
          placeholder="Email Address"
          type="email"
        />
        <input
          className="w-2/3"
          {...register("password")}
          placeholder="Password"
          type="password"
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
        <div className="flex flex-row gap-2">
          <input type="checkbox" />
          <label>Accept terms and conditions</label>
        </div>
        <button
          className="border rounded-md border-gray-300 p-2 hover:bg-gray-200 focus:bg-gray-200 w-1/2"
          type="submit">
          Register
        </button>
        <span
          className="text-sm hover:underline cursor-pointer text-blue-500"
          onClick={() => router.push("/")}>
          Already have an account? Log in here!
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
