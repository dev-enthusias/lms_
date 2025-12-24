import z from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter your password"),
});

export type LoginInputs = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Please enter your first name")
      .trim()
      .toLowerCase(),
    middleName: z
      .string()
      .min(1, "Please enter your middle name")
      .trim()
      .toLowerCase(),
    lastName: z
      .string()
      .min(1, "Please enter your last name")
      .trim()
      .toLowerCase(),
    email: z.email("Please enter a valid email address").trim().toLowerCase(),
    phoneNumber: z
      .string()
      .startsWith(
        "+234",
        'Phone number must start with "+234", e.g. "+2348100011000"'
      )
      .min(14, "Please enter a valid phone number")
      .trim()
      .toLowerCase(),
    password: z.string().min(1, "Please enter your password"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    termsAndCondition: z.literal(true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInputs = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export type ForgotPasswordInputs = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(1, "Please enter your password"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordInputs = z.infer<typeof resetPasswordSchema>;
