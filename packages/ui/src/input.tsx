import clsx from "clsx";
import {
  Path,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<
  T extends FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<T>;
  name: Path<T>;
  errors: FieldErrors<T>;
}

export function Input<T extends FieldValues>({
  register,
  name,
  errors,
  className,
  ...rest
}: InputProps<T>) {
  const type = rest.type ?? "text";

  return (
    <input
      className={clsx(
        "ui:w-full ui:border ui:lg:text-base ui:border-grey-100 ui:focus:outline-primary/30 ui:rounded-lg ui:px-3 ui:py-2.5 ui:h-12 ui:placeholder:text-grey-200 ui:text-sm ui:text-grey-500",
        {
          "ui:border-red-300": errors[name],
        },
        className
      )}
      type={type}
      {...register(name)}
      aria-invalid={errors[name] ? "true" : "false"}
      {...rest}
    />
  );
}
