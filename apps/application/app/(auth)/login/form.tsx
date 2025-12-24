"use client";

import Link from "next/link";
import { Label } from "@lms/ui/label";
import { Input } from "@lms/ui/input";
import { Button } from "@lms/ui/button";
import { FormError } from "@lms/ui/form-error";
import { useSubmit } from "../../../hook/useSubmit";
import { LoginInputs, loginSchema } from "../../../lib/schema";

export default function LoginForm() {
  const { register, submitForm, errors } = useSubmit<LoginInputs>(
    "/",
    loginSchema
  );

  return (
    <form onSubmit={submitForm} className="grid gap-4 mb-6">
      <div className="grid gap-y-1">
        <Label>Email</Label>
        <Input
          register={register}
          name="email"
          errors={errors}
          placeholder="Enter your email"
        />
        {errors.email && <FormError message={errors.email.message} />}
      </div>

      <div className="grid gap-y-1">
        <div className="flex justify-between items-end">
          <Label>Password</Label>
          <Link
            href="/forgot-password"
            className="text-primary font-semibold underline "
          >
            Forgot Password?
          </Link>
        </div>
        <Input<LoginInputs>
          register={register}
          name="password"
          errors={errors}
          placeholder="Enter your password"
        />
        {errors.password && <FormError message={errors.password.message} />}
      </div>

      <Button className="mt-2">Login</Button>
    </form>
  );
}
