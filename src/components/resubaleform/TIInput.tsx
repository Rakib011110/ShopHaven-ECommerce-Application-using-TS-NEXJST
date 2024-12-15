// TIInput.tsx
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { IInput } from "@/src/types";

interface IProps extends IInput {
  as?: "input" | "textarea";
  rows?: number;
}

export default function TIInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  placeholder = "  ",
  name,
  as = "input",
  rows,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (as === "textarea") {
    return (
      <textarea
        {...register(name, { required })}
        className={`w-full px-4 py-2 border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        placeholder={placeholder}
        required={required}
        rows={rows}
      />
    );
  }

  return (
    <Input
      {...register(name, { required })}
      // errorMessage={errors[name] ? (errors[name].message as string) : ""}
      // isInvalid={!!errors[name]}
      placeholder={placeholder}
      required={required}
      size={size}
      type={type}
      variant={variant}
    />
  );
}
