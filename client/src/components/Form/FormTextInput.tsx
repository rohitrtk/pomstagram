import { InputHTMLAttributes } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, UseFormRegister } from "react-hook-form";

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
      <input
        className={`w-full border rounded-md ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } p-2`}
        {...register(name, requiredMessage ? { required: "Required" } : {})}
        placeholder={placeholder}
        type={type}
      />
      {!noErrorMessage ? (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <p className="text-red-500 text-xs">{message}</p>
          )}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default FormTextInput;
