"use client";

import Link from "next/link";
import { Label } from "@lms/ui/label";
import { Input } from "@lms/ui/input";
import { Button } from "@lms/ui/button";
import { FormError } from "@lms/ui/form-error";
import { useSubmit } from "../../../hook/useSubmit";
import { ResetPasswordInputs, resetPasswordSchema } from "../../../lib/schema";

export default function ResetPasswordForm() {
  const { register, submitForm, errors } = useSubmit<ResetPasswordInputs>(
    "/login",
    resetPasswordSchema
  );

  return (
    <form onSubmit={submitForm} className="grid gap-4 mb-6">
      <div className="grid gap-y-1">
        <Label>Password</Label>

        <Input
          register={register}
          name="password"
          errors={errors}
          placeholder="Enter a new password"
        />
        {errors.password && <FormError message={errors.password.message} />}
      </div>

      <div className="grid gap-y-1">
        <Label>Confirm password</Label>

        <Input
          register={register}
          name="confirmPassword"
          errors={errors}
          placeholder="Confirm your new password"
        />
        {errors.confirmPassword && (
          <FormError message={errors.confirmPassword.message} />
        )}
      </div>

      <Button className="mt-2">Reset Password</Button>
    </form>
  );
}
