"use client";

import {
  ForgotPasswordInputs,
  forgotPasswordSchema,
} from "../../../lib/schema";
import { Label } from "@lms/ui/label";
import { Input } from "@lms/ui/input";
import { Button } from "@lms/ui/button";
import { FormError } from "@lms/ui/form-error";
import { useSubmit } from "../../../hook/useSubmit";

export default function ForgotPasswordForm() {
  const { register, submitForm, errors } = useSubmit<ForgotPasswordInputs>(
    "/reset-password",
    forgotPasswordSchema
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

      <Button className="mt-2">Confirm Email</Button>
    </form>
  );
}
