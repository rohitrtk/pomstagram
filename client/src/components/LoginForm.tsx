import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { setLogin } from "@/state";

const loginSchema = yup.object().shape({
  emailAddress: yup.string().required("required"),
  password: yup.string().required("required")
});

interface FormValues {
  emailAddress: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<FormValues>({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data: FormValues) => {
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const loggedIn = await res.json();
    reset();

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token
        })
      );

      console.log("Logged In!");
      //router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="m-auto flex flex-col justify-center items-center gap-5 [&>input]:border [&>input]:rounded-md [&>input]:border-gray-300 [&>input]:p-2 border border-gray-300 rounded-lg shadow-lg p-5">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <h1 className="text-4xl font-bold">Pomstagram</h1>
          <p>Log In</p>
        </div>
        <input
          {...register("emailAddress")}
          placeholder="Email Address"
          type="email"
        />
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
        />
        <button
          className="border rounded-md border-gray-300 p-2 hover:bg-gray-200 focus:bg-gray-200"
          type="submit">
          Log In
        </button>
        <span
          className="text-sm hover:underline cursor-pointer text-blue-500"
          onClick={() => router.push("/register")}>
          Don&apos;t have an account? Sign up now!
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
