import {
  useForm,
  FieldValues,
  SubmitHandler,
  DefaultValues,
} from "react-hook-form";
import { ZodType } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

/**
 * A hook to handle form submission using react-hook-form and zod for validation.
 * @param path The path to navigate to upon successful form submission.
 * @param schema The zod schema for form validation.
 * @param defaultValues The default values for the form fields (optional).
 * @template T The type of the form data.
 * @returns An object containing register, errors, and submitForm function.
 */
export function useSubmit<T extends FieldValues>(
  path: string,
  schema: ZodType<T, any, any>,
  defaultValues?: DefaultValues<T>
) {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
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
