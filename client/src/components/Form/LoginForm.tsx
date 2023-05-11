import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@material-tailwind/react";

import { setLogin } from "@/state";
import Pomstagram from "@/components/Pomstagram";
import FormTextInput from "./FormTextInput";

const loginSchema = yup.object().shape({
  emailAddress: yup.string().required("Required"),
  password: yup.string().required("Required")
});

interface FormValues {
  emailAddress: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loginFailed, setLoginFailed] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data: FormValues) => {
    setLoginFailed(false);

    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (res.status === 400) {
      setLoginFailed(true);
      return;
    }

    const loggedIn = await res.json();
    reset();

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="m-auto flex flex-col justify-center items-center gap-5 [&>input]:border [&>input]:rounded-md [&>input]:border-gray-300 [&>input]:p-2 border border-gray-300 rounded-sm shadow-lg p-5 h-full">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <Pomstagram />
          <Typography>Log In</Typography>
        </div>
        <FormTextInput
          name="emailAddress"
          placeholder="Email Address"
          type="email"
          errors={errors}
          register={register}
          requiredMessage="required"
          noErrorMessage={true}
        />

        <FormTextInput
          name="password"
          placeholder="Password"
          type="password"
          errors={errors}
          register={register}
          requiredMessage="required"
          noErrorMessage={true}
        />

        {loginFailed ? (
          <Typography className="text-red-500 text-xs">
            An error occured. Check your email and password combiation.
          </Typography>
        ) : (
          <></>
        )}

        <Button className="border rounded-md p-2 w-1/2" type="submit">
          Log In
        </Button>
        <Typography
          size="small"
          color="blue"
          className="hover:underline cursor-pointer"
          onClick={() => router.push("/register")}>
          Don&apos;t have an account? Sign up now!
        </Typography>
      </div>
    </form>
  );
};

export default LoginForm;
