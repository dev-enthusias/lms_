"use client";

import { Input } from "@lms/ui/input";
import { Label } from "@lms/ui/label";
import { FormError } from "@lms/ui/form-error";
import { useSubmit } from "../../hook/useSubmit";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ApplicationInputs, applicationSchema } from "../../lib/schema";

export function ApplicationForm() {
  const { register, submitForm, errors } = useSubmit<ApplicationInputs>(
    "/success",
    applicationSchema,
    { firstName: "John", lastName: "Doe" }
  );

  function Field({
    register,
    errors,
    label,
    name,
  }: {
    name: keyof ApplicationInputs;
    label: string;
    register: UseFormRegister<ApplicationInputs>;
    errors: FieldErrors<ApplicationInputs>;
  }) {
    return (
      <div className="grid gap-y-0.5 grow">
        <Label className="text-sm">{label}</Label>
        <Input register={register} name={name} errors={errors} />
        {errors[name] && <FormError message={errors[name].message} />}
      </div>
    );
  }

  return (
    <form
      onSubmit={submitForm}
      className="bg-white rounded-xl border-[#E5E7EB] px-7 py-6"
      style={{ boxShadow: "0.5px 0.5px 10px rgba(0, 0, 0, 0.05)" }}
    >
      <button className="mb-4 text-[0.9375rem] underline text-primary ml-auto cursor-pointer hover:text-primary/80 duration-300 ease-in-out transition-colors block">
        Make suggestions and complaints
      </button>

      <div className="flex flex-col gap-y-8">
        <fieldset className="border border-grey-100 rounded-xl px-7 py-7">
          <legend className="text-sm text-primary px-1.5">
            Personal information of the applicant
          </legend>

          <div className="grid grid-cols-2 gap-x-14 gap-y-7">
            <Field
              register={register}
              errors={errors}
              label="Surname"
              name="firstName"
            />
            <Field
              register={register}
              errors={errors}
              label="Middle name"
              name="middleName"
            />
            <Field
              register={register}
              errors={errors}
              label="Last name"
              name="lastName"
            />
            <Field
              register={register}
              errors={errors}
              label="Date of Birth"
              name="lastName"
            />
            <Field
              register={register}
              errors={errors}
              label="Gender"
              name="email"
            />

            <p className="col-span-2 text-[0.9375rem] text-grey-500">
              * Please ensure all information provided is accurate and complete
              as they will be used to verify your identity.
            </p>
          </div>
        </fieldset>

        <fieldset className="border border-grey-100 rounded-xl px-7 py-7">
          <legend className="text-sm text-primary px-1.5">
            Address information of the applicant
          </legend>

          <div className="grid grid-cols-2 gap-x-14 gap-y-7">
            <Field
              register={register}
              errors={errors}
              label="Nationality"
              name="email"
            />
            <Field
              register={register}
              errors={errors}
              label="State of origin"
              name="email"
            />
            <Field
              register={register}
              errors={errors}
              label="LGA of origin"
              name="email"
            />
            <Field
              register={register}
              errors={errors}
              label="Residential address"
              name="email"
            />

            <p className="col-span-2 text-[0.9375rem] text-grey-500">
              * Please ensure all information provided is accurate and complete
              as they will be used to verify your identity.
            </p>
          </div>
        </fieldset>

        <fieldset className="border border-grey-100 rounded-xl px-7 py-7">
          <legend className="text-sm text-primary px-1.5">
            Educational information of the applicant
          </legend>

          <div className="grid grid-cols-2 gap-x-14 gap-y-7">
            <Field
              register={register}
              errors={errors}
              label="Programme of study"
              name="email"
            />
            <Field
              register={register}
              errors={errors}
              label="Campus selected during JAMB registration"
              name="email"
            />
          </div>
        </fieldset>

        <fieldset className="border border-grey-100 rounded-xl px-7 py-7">
          <legend className="text-sm text-primary px-1.5">
            Educational information of the applicant (O'Level)
          </legend>

          <div className="grid grid-cols-2 gap-x-14 gap-y-7">
            <Field
              register={register}
              errors={errors}
              label="Examintion type"
              name="email"
            />
            <Field
              register={register}
              errors={errors}
              label="Examination number"
              name="email"
            />
            <Field
              register={register}
              errors={errors}
              label="Examination year"
              name="email"
            />

            <UploadButton label="Upload O'Level result" />

            <p className="col-span-2 text-[0.9375rem] text-grey-500">
              * Please note that you must pass your 5 compulsory subjects{" "}
              <span className="italic text-sm">
                (Mathematic, English, Physics, Chemistry, Biology)
              </span>{" "}
              in not less than 2 sittings.
              <button
                className="text-primary underline ml-2 cursor-pointer hover:text-primary/80 duration-300 ease-in-out transition-colors"
                onClick={() => setExamCount(examCount + 1)}
              >
                Add another exam
              </button>
            </p>
          </div>
        </fieldset>

        <fieldset className="border border-grey-100 rounded-xl px-7 py-7">
          <legend className="text-sm text-primary px-1.5">
            Educational information of the applicant (JAMB)
          </legend>

          <div className="grid grid-cols-2 gap-x-14 gap-y-7">
            <Field
              register={register}
              errors={errors}
              label="JAMB Registration Number"
              name="email"
            />
            <Field
              register={register}
              errors={errors}
              label="JAMB Score"
              name="email"
            />

            <UploadButton label="Upload JAMB result" />

            <div className="col-span-2 grid gap-y-1.5">
              <p className="col-span-2 text-[0.9375rem] text-grey-500">
                * The size of the image should not exceed 1MB.
              </p>
              <p className="col-span-2 text-[0.9375rem] text-grey-500">
                * Please ensure the image is in either JPEG or PNG format.
              </p>
            </div>
          </div>
        </fieldset>

        <button className="w-fit ml-auto bg-primary text-white h-14 rounded-xl border-none px-10 py-3 disabled:bg-grey-100 disabled:text-grey-200 font-semibold">
          Save and Preview
        </button>
      </div>
    </form>
  );
}

function UploadButton({ label }: { label?: string }) {
  const createDashedBorder = (
    dashLength = 20,
    gapLength = 10,
    strokeWidth = 1,
    radius = 8, // Control border radius here
    color = "#022651"
  ) => {
    const encodedColor = encodeURIComponent(color);
    return `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='${radius}' ry='${radius}' stroke='${encodedColor}' stroke-width='${strokeWidth}' stroke-dasharray='${dashLength},${gapLength}' stroke-dashoffset='0'/%3e%3c/svg%3e")`;
  };

  return (
    <div
      className="w-[502px] h-[60px] text-primary  col-span-2 font-medium flex gap-x-2 items-center justify-center text-[0.9375rem] bg-primary/15"
      style={{
        backgroundImage: createDashedBorder(8, 3, 1, 8, "#022651"),
        borderRadius: "8px",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="h-5 w-5"
      >
        <path d="M12 3v12" />
        <path d="m17 8-5-5-5 5" />
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      </svg>{" "}
      {label ? label : "Upload file here"}
    </div>
  );
}
