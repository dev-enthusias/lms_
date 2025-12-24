"use client";

import Link from "next/link";
import { Input } from "@lms/ui/input";
import { Label } from "@lms/ui/label";
import { Button } from "@lms/ui/button";
import { FormError } from "@lms/ui/form-error";
import { useSubmit } from "../../../hook/useSubmit";
import { RegisterInputs, registerSchema } from "../../../lib/schema";
import { PhoneInput } from "../../../../../packages/ui/src/phone-input";

export default function RegisterForm() {
  const { register, submitForm, errors, control } = useSubmit<RegisterInputs>(
    "/success",
    registerSchema
  );

  return (
    <form onSubmit={submitForm} className="grid gap-4 mb-6">
      <div className="grid grid-cols-3 gap-x-2 items-start">
        <div className="grid gap-y-1 grow">
          <Label>First name</Label>
          <Input register={register} name="firstName" errors={errors} />
          {errors.firstName && <FormError message={errors.firstName.message} />}
        </div>

        <div className="grid gap-y-1 grow">
          <Label>Middle name</Label>
          <Input register={register} name="middleName" errors={errors} />
          {errors.middleName && (
            <FormError message={errors.middleName.message} />
          )}
        </div>

        <div className="grid gap-y-1 grow">
          <Label>Last name</Label>
          <Input register={register} name="lastName" errors={errors} />
          {errors.lastName && <FormError message={errors.lastName.message} />}
        </div>
      </div>

      <div className="grid gap-y-1">
        <Label>Email</Label>
        <Input register={register} name="email" errors={errors} />
        {errors.email && <FormError message={errors.email.message} />}
      </div>

      <PhoneInput errors={errors} name="phoneNumber" control={control as any} />

      <div className=" grid grid-cols-2 gap-x-2 items-start">
        <div className="grid gap-y-1">
          <Label>Password</Label>
          <Input
            register={register}
            type="password"
            name="password"
            errors={errors}
          />
          {errors.password && <FormError message={errors.password.message} />}
        </div>

        <div className="grid gap-y-1">
          <Label>Confirm password</Label>
          <Input
            register={register}
            type="password"
            name="confirmPassword"
            errors={errors}
          />
          {errors.confirmPassword && (
            <FormError message={errors.confirmPassword.message} />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" />
        <Label>
          I agree to the{" "}
          <Link href="/terms-and-conditions" className="underline">
            Terms and Conditions
          </Link>
        </Label>
        {errors.termsAndCondition && (
          <FormError message={errors.termsAndCondition.message} />
        )}
      </div>

      <Button className="mt-2">Register</Button>
    </form>
  );
}
