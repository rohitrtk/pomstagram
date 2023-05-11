import { InputHTMLAttributes } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input, Typography } from "@material-tailwind/react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errors: FieldErrors<any>;
  register: UseFormRegister<any>;
  requiredMessage?: string;
  noErrorMessage?: boolean;
}

const FormTextInput = ({
  name,
  placeholder,
  type,
  errors,
  register,
  requiredMessage,
  noErrorMessage = false
}: Props) => {
  return (
    <div className="w-2/3 flex flex-col">
      <Input
        className={`w-full border rounded-md ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } p-2`}
        {...register(name, requiredMessage ? { required: "Required" } : {})}
        type={type}
        label={placeholder}
      />
      {!noErrorMessage ? (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <Typography className="text-red-500 text-xs">{message}</Typography>
          )}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default FormTextInput;
