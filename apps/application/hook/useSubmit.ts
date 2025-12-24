import { ZodType } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

/**
 * A hook to handle form submission using react-hook-form and zod for validation.
 * @param path The path to navigate to upon successful form submission.
 * @param schema The zod schema for form validation.
 * @template T The type of the form data.
 * @returns An object containing register, errors, and submitForm function.
 */
export function useSubmit<T extends FieldValues>(
  path: string,
  schema: ZodType<T, any, any>
) {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<T> = async (data) => {
    console.log(data);

    if (path) {
      router.push(path);
    }
  };

  return {
    errors,
    control,
    register,
    submitForm: handleSubmit(onSubmit),
  };
}
