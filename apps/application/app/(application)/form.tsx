// "use client";

// import { Input } from "@lms/ui/input";
// import { Label } from "@lms/ui/label";
// import { FormError } from "@lms/ui/form-error";
// import { useSubmit } from "../../hook/useSubmit";
// import { FieldErrors, UseFormRegister } from "react-hook-form";
// import { ApplicationInputs, applicationSchema } from "../../lib/schema";
// import { GradeSelect } from "@lms/ui/select";
// import React, { useState } from "react";

// export function ApplicationForm() {
//   const [currentNumberOfSitting, setCurrentNumberOfSitting] = useState(1);
//   const { register, submitForm, errors } = useSubmit<ApplicationInputs>(
//     "/success",
//     applicationSchema,
//     { firstName: "John", lastName: "Doe" }
//   );

//   function Field({
//     register,
//     errors,
//     label,
//     name,
//   }: {
//     name: keyof ApplicationInputs;
//     label: string;
//     register: UseFormRegister<ApplicationInputs>;
//     errors: FieldErrors<ApplicationInputs>;
//   }) {
//     return (
//       <div className="grid gap-y-0.5 grow">
//         <Label className="text-sm">{label}</Label>
//         <Input register={register} name={name} errors={errors} />
//         {errors[name] && <FormError message={errors[name].message} />}
//       </div>
//     );
//   }

//   return (
//     <form
//       onSubmit={submitForm}
//       className="bg-white rounded-xl border-[#E5E7EB] px-7 py-6"
//       style={{ boxShadow: "0.5px 0.5px 10px rgba(0, 0, 0, 0.05)" }}
//     >
//       <button className="mb-4 text-[0.9375rem] underline text-primary ml-auto cursor-pointer hover:text-primary/80 duration-300 ease-in-out transition-colors block">
//         Make suggestions and complaints
//       </button>

//         <fieldset className="border border-grey-100 rounded-xl px-7 py-7">
//           <legend className="text-sm text-primary px-1.5">
//             Address information of the applicant
//           </legend>

//           <div className="grid grid-cols-2 gap-x-14 gap-y-7">
//             <Field
//               register={register}
//               errors={errors}
//               label="Nationality"
//               name="email"
//             />
//             <Field
//               register={register}
//               errors={errors}
//               label="State of origin"
//               name="email"
//             />
//             <Field
//               register={register}
//               errors={errors}
//               label="LGA of origin"
//               name="email"
//             />
//             <Field
//               register={register}
//               errors={errors}
//               label="Residential address"
//               name="email"
//             />

//             <p className="col-span-2 text-[0.9375rem] text-grey-500">
//               * Please ensure all information provided is accurate and complete
//               as they will be used to verify your identity.
//             </p>
//           </div>
//         </fieldset>

//         <fieldset className="border border-grey-100 rounded-xl px-7 py-7">
//           <legend className="text-sm text-primary px-1.5">
//             Educational information of the applicant
//           </legend>

//           <div className="grid grid-cols-2 gap-x-14 gap-y-7">
//             <Field
//               register={register}
//               errors={errors}
//               label="Programme of study"
//               name="email"
//             />
//             <Field
//               register={register}
//               errors={errors}
//               label="Campus selected during JAMB registration"
//               name="email"
//             />
//           </div>
//         </fieldset>

//         <fieldset className="border border-grey-100 rounded-xl px-7 py-7">
//           <legend className="text-sm text-primary px-1.5">
//             Educational information of the applicant (O'Level)
//           </legend>

//           <div className="grid grid-cols-2 gap-x-14 gap-y-7">
//             {Array.from({ length: currentNumberOfSitting }).map((_, index) => (
//               <div key={index} className="col-span-2">
//                 <p className="col-span-2 text-sm text-primary font-medium mb-2">Sitting {index + 1}</p>

//                 <div className='grid grid-cols-2 gap-x-14 gap-y-7'>
//                   <Field
//                     register={register}
//                     errors={errors}
//                     label={`Examination type`}
//                     name={`olevel.${index}.type` as any}
//                   />

//                   <Field
//                     register={register}
//                     errors={errors}
//                     label={`Examination number`}
//                     name={`olevel.${index}.number` as any}
//                   />
//                   <Field
//                     register={register}
//                     errors={errors}
//                     label={`Examination year`}
//                     name={`olevel.${index}.year` as any}
//                   />
//                 </div>
//               </div>
//             ))}

//             <div className="col-span-2 flex gap-x-4">
//               {Array.from({ length: currentNumberOfSitting }).map(
//                 (_, index) => (
//                   <OLevelGradeTable key={index} sittingIndex={index} />
//                 )
//               )}
//             </div>

//             <UploadButton label="Upload O'Level result" />

//             <p className="col-span-2 text-[0.9375rem] text-grey-500">
//               * Please note that you must pass your 5 compulsory subjects{" "}
//               <span className="italic text-sm">
//                 (Mathematic, English, Physics, Chemistry, Biology)
//               </span>{" "}
//               in not more than 2 sittings.
//               {currentNumberOfSitting < 2 ? (
//                 <button
//                   type="button"
//                   className="text-primary text-base items-center ml-1 underline inline-flex gap-x-1 font-medium cursor-pointer hover:text-primary/80 duration-300 ease-in-out transition-colors"
//                   onClick={() => setCurrentNumberOfSitting(2)}
//                 >
//                   Add second sitting
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   className="text-primary text-base underline ml-2  font-medium cursor-pointer hover:text-primary/80 duration-300 ease-in-out transition-colors"
//                   onClick={() => setCurrentNumberOfSitting(1)}
//                 >
//                   Remove second sitting
//                 </button>
//               )}
//             </p>
//           </div>
//         </fieldset>

//         <fieldset className="border border-grey-100 rounded-xl px-7 py-7">
//           <legend className="text-sm text-primary px-1.5">
//             Educational information of the applicant (JAMB)
//           </legend>

//           <div className="grid grid-cols-2 gap-x-14 gap-y-7">
//             <Field
//               register={register}
//               errors={errors}
//               label="JAMB Registration Number"
//               name="email"
//             />
//             <Field
//               register={register}
//               errors={errors}
//               label="JAMB Score"
//               name="email"
//             />

//             <UploadButton label="Upload JAMB result" />

//             <div className="col-span-2 grid gap-y-1.5">
//               <p className="col-span-2 text-[0.9375rem] text-grey-500">
//                 * The size of the image should not exceed 1MB.
//               </p>
//               <p className="col-span-2 text-[0.9375rem] text-grey-500">
//                 * Please ensure the image is in either JPEG or PNG format.
//               </p>
//             </div>
//           </div>
//         </fieldset>

//         <button className="w-fit ml-auto bg-primary text-white h-14 rounded-xl border-none px-10 py-3 disabled:bg-grey-100 disabled:text-grey-200 font-semibold">
//           Save and Preview
//         </button>
//       </div>
//     </form>
//   );
// }

// function UploadButton({ label }: { label?: string }) {
//   const createDashedBorder = (
//     dashLength = 20,
//     gapLength = 10,
//     strokeWidth = 1,
//     radius = 8, // Control border radius here
//     color = "#022651"
//   ) => {
//     const encodedColor = encodeURIComponent(color);
//     return `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='${radius}' ry='${radius}' stroke='${encodedColor}' stroke-width='${strokeWidth}' stroke-dasharray='${dashLength},${gapLength}' stroke-dashoffset='0'/%3e%3c/svg%3e")`;
//   };

//   return (
//     <div
//       className="w-[502px] h-[60px] text-primary  col-span-2 font-medium flex gap-x-2 items-center justify-center text-[0.9375rem] bg-primary/15"
//       style={{
//         backgroundImage: createDashedBorder(8, 3, 1, 8, "#022651"),
//         borderRadius: "8px",
//       }}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="h-5 w-5"
//       >
//         <path d="M12 3v12" />
//         <path d="m17 8-5-5-5 5" />
//         <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//       </svg>{" "}
//       {label ? label : "Upload file here"}
//     </div>
//   );
// }

// function OLevelGradeTable({ sittingIndex }: { sittingIndex: number }) {
//   // prettier-ignore
//   const predefinedSubjectRows = ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
//   const editableSubjectRows = Array.from({ length: 4 }, () => undefined);
//   const subjectRows = [...predefinedSubjectRows, ...editableSubjectRows];

//   return (
//     <div className="grid grid-cols-3 flex-1 border border-grey-100">
//       <p className="col-span-3 text-sm font-medium text-primary text-center py-1 border-b border-grey-100">
//         Sitting {sittingIndex + 1}
//       </p>

//       {/* Subjects column */}
//       <div className="col-span-2">
//         <p className="font-medium font-inter text-grey-500 text-sm text-center py-1 border-b border-b-grey-100">
//           Subject
//         </p>
//         {subjectRows.map((row, index) => (
//           <div
//             key={`subject-${index}`}
//             className="border-b border-grey-100 last:border-0"
//           >
//             <input
//               type="text"
//               className="w-full py-1.5 focus:outline-none focus:border focus:border-primary px-2 text-[0.9375rem] text-grey-500 h-9"
//               placeholder="Enter a subject"
//               value={row && row}
//               readOnly={row ? true : false}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Grades column */}
//       <div className="border-l border-l-grey-100">
//         <p className="font-medium font-inter text-grey-500  text-sm text-center py-1 border-b border-b-grey-100">
//           Grade
//         </p>
//         {subjectRows.map((row, index) => (
//           <div
//             key={`grade-${index}`}
//             className="border-b border-grey-100 last:border-0"
//           >
//             <GradeSelect />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { Input } from "@lms/ui/input";
import { Label } from "@lms/ui/label";
import { FormError } from "@lms/ui/form-error";
import { useSubmit } from "../../hook/useSubmit";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ApplicationInputs,
    applicationSchema,
    gradeSchema,
    examTypeSchema,
} from "../../lib/schema";
import { GradeSelect } from "@lms/ui/select";
import React, { useState } from "react";
import { FieldInput, FieldWrapper } from "@lms/ui/field";
import { Fi } from "zod/v4/locales";
import { FieldsetWrapper } from "@lms/ui/fieldset";
import { DatePicker } from "@lms/ui/date-picker";

// Define default values
const defaultValues: Partial<ApplicationInputs> = {
    surname: "John",
    lastName: "Doe",
    // gender: "male",
    olevelResults: [
        {
            type: "WAEC",
            examinationNumber: "",
            year: "",
            subjects: [
                { subject: "English", grade: "N/A" },
                { subject: "Mathematics", grade: "N/A" },
                { subject: "Physics", grade: "N/A" },
                { subject: "Chemistry", grade: "N/A" },
                { subject: "Biology", grade: "N/A" },
                { subject: "", grade: "N/A" },
                { subject: "", grade: "N/A" },
                { subject: "", grade: "N/A" },
                { subject: "", grade: "N/A" },
            ],
        },
    ],
};

// Predefined compulsory subjects
const COMPULSORY_SUBJECTS = [
    "English",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
];

export function ApplicationForm() {
    const [currentNumberOfSitting, setCurrentNumberOfSitting] = useState(1);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        setValue,
        watch,
    } = useForm<ApplicationInputs>({
        resolver: zodResolver(applicationSchema),
        defaultValues,
        mode: "onBlur",
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "olevelResults",
    });

    const olevelResults = watch("olevelResults");

    const onSubmit = async (data: ApplicationInputs) => {
        try {
            // Additional validation for compulsory subjects
            const hasCompulsorySubjects = data.olevelResults.every(
                (sitting) => {
                    const sittingSubjects = sitting.subjects.map((s) =>
                        s.subject.toLowerCase(),
                    );
                    return COMPULSORY_SUBJECTS.every((compulsory) =>
                        sittingSubjects.includes(compulsory.toLowerCase()),
                    );
                },
            );

            if (!hasCompulsorySubjects) {
                alert("Please include all compulsory subjects in each sitting");
                return;
            }

            // Convert form data for submission
            const formData = new FormData();

            // Add all form fields
            Object.entries(data).forEach(([key, value]) => {
                if (key === "olevelResults") {
                    formData.append(key, JSON.stringify(value));
                } else if (value instanceof File) {
                    formData.append(key, value);
                } else if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });

            // Submit form data
            const response = await fetch("/api/application", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                window.location.href = "/success";
            } else {
                throw new Error("Submission failed");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit application. Please try again.");
        }
    };

    const handleFileUpload = (
        fieldName: keyof ApplicationInputs,
        file: File,
    ) => {
        setValue(fieldName, file);
    };

    const addOLevelSitting = () => {
        if (fields.length < 2) {
            append({
                type: "WAEC",
                examinationNumber: "",
                year: "",
                subjects: [
                    { subject: "English", grade: "N/A" },
                    { subject: "Mathematics", grade: "N/A" },
                    { subject: "Physics", grade: "N/A" },
                    { subject: "Chemistry", grade: "N/A" },
                    { subject: "Biology", grade: "N/A" },
                    { subject: "", grade: "N/A" },
                    { subject: "", grade: "N/A" },
                    { subject: "", grade: "N/A" },
                    { subject: "", grade: "N/A" },
                ],
            });
            setCurrentNumberOfSitting(2);
        }
    };

    const removeOLevelSitting = () => {
        if (fields.length > 1) {
            remove(1);
            setCurrentNumberOfSitting(1);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl border-[#E5E7EB] bg-white px-7 py-6"
            style={{ boxShadow: "0.5px 0.5px 10px rgba(0, 0, 0, 0.05)" }}
        >
            <button
                type="button"
                className="text-primary hover:text-primary/80 mb-4 ml-auto block cursor-pointer text-[0.9375rem] underline transition-colors duration-300 ease-in-out"
            >
                Make suggestions and complaints
            </button>

            <div className="flex flex-col gap-y-8">
                <PersonalInformation control={control} />

                {/* Address Information */}
                <fieldset className="border-grey-100 rounded-xl border px-7 py-7">
                    <legend className="text-primary px-1.5 text-sm">
                        Address information of the applicant
                    </legend>

                    <div className="grid grid-cols-2 gap-x-14 gap-y-7">
                        <FormField
                            label="Nationality"
                            name="nationality"
                            register={register}
                            error={errors.nationality}
                            required
                        />
                        <FormField
                            label="State of origin"
                            name="stateOfOrigin"
                            register={register}
                            error={errors.stateOfOrigin}
                            required
                        />
                        <FormField
                            label="LGA of origin"
                            name="lgaOfOrigin"
                            register={register}
                            error={errors.lgaOfOrigin}
                            required
                        />
                        <FormField
                            label="Residential address"
                            name="residentialAddress"
                            register={register}
                            error={errors.residentialAddress}
                            required
                        />
                    </div>
                </fieldset>

                {/* Educational Information */}
                <fieldset className="border-grey-100 rounded-xl border px-7 py-7">
                    <legend className="text-primary px-1.5 text-sm">
                        Educational information of the applicant
                    </legend>

                    <div className="grid grid-cols-2 gap-x-14 gap-y-7">
                        <FormField
                            label="Programme of study"
                            name="programmeOfStudy"
                            register={register}
                            error={errors.programmeOfStudy}
                            required
                        />
                        <FormField
                            label="Campus selected during JAMB registration"
                            name="jambCampus"
                            register={register}
                            error={errors.jambCampus}
                            required
                        />
                    </div>
                </fieldset>

                {/* O'Level Results */}
                <fieldset className="border-grey-100 rounded-xl border px-7 py-7">
                    <legend className="text-primary px-1.5 text-sm">
                        Educational information of the applicant (O'Level)
                    </legend>

                    <div className="grid grid-cols-1 gap-y-7">
                        {fields.map((field, sittingIndex) => (
                            <div key={field.id} className="space-y-4">
                                <p className="text-primary text-sm font-medium">
                                    Sitting {sittingIndex + 1}
                                </p>

                                <div className="grid grid-cols-2 gap-x-14 gap-y-7">
                                    <div className="grid grow gap-y-0.5">
                                        <Label className="text-sm">
                                            Examination type
                                        </Label>
                                        <select
                                            className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
                                            {...register(
                                                `olevelResults.${sittingIndex}.type`,
                                            )}
                                        >
                                            {examTypeSchema.options.map(
                                                (type) => (
                                                    <option
                                                        key={type}
                                                        value={type}
                                                    >
                                                        {type}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                        {errors.olevelResults?.[sittingIndex]
                                            ?.type && (
                                            <FormError
                                                message={
                                                    errors.olevelResults[
                                                        sittingIndex
                                                    ]!.type!.message
                                                }
                                            />
                                        )}
                                    </div>

                                    <FormField
                                        label="Examination number"
                                        name={`olevelResults.${sittingIndex}.examinationNumber`}
                                        register={register}
                                        error={
                                            errors.olevelResults?.[sittingIndex]
                                                ?.examinationNumber
                                        }
                                        required
                                    />

                                    <FormField
                                        label="Examination year"
                                        name={`olevelResults.${sittingIndex}.year`}
                                        register={register}
                                        error={
                                            errors.olevelResults?.[sittingIndex]
                                                ?.year
                                        }
                                        required
                                    />
                                </div>

                                <OLevelGradeTable
                                    sittingIndex={sittingIndex}
                                    control={control}
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                        ))}

                        <div className="space-y-4">
                            <FileUpload
                                label="Upload O'Level result"
                                onFileSelect={(file) =>
                                    handleFileUpload("olevelResultFile", file)
                                }
                                accept=".pdf,.jpg,.jpeg,.png"
                            />

                            <p className="text-grey-500 text-[0.9375rem]">
                                * Please note that you must pass your 5
                                compulsory subjects{" "}
                                <span className="text-sm italic">
                                    (Mathematics, English, Physics, Chemistry,
                                    Biology)
                                </span>{" "}
                                in not more than 2 sittings.
                                {currentNumberOfSitting < 2 ? (
                                    <button
                                        type="button"
                                        onClick={addOLevelSitting}
                                        className="text-primary hover:text-primary/80 ml-1 inline-flex cursor-pointer items-center gap-x-1 text-base font-medium underline transition-colors duration-300 ease-in-out"
                                    >
                                        Add second sitting
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={removeOLevelSitting}
                                        className="text-primary hover:text-primary/80 ml-2 cursor-pointer text-base font-medium underline transition-colors duration-300 ease-in-out"
                                    >
                                        Remove second sitting
                                    </button>
                                )}
                            </p>
                        </div>
                    </div>
                </fieldset>

                {/* JAMB Information */}
                <fieldset className="border-grey-100 rounded-xl border px-7 py-7">
                    <legend className="text-primary px-1.5 text-sm">
                        Educational information of the applicant (JAMB)
                    </legend>

                    <div className="grid grid-cols-2 gap-x-14 gap-y-7">
                        <FormField
                            label="JAMB Registration Number"
                            name="jambRegNumber"
                            register={register}
                            error={errors.jambRegNumber}
                            required
                        />
                        <FormField
                            label="JAMB Score"
                            name="jambScore"
                            type="number"
                            register={register}
                            error={errors.jambScore}
                            required
                            min={0}
                            max={400}
                        />

                        <div className="col-span-2">
                            <FileUpload
                                label="Upload JAMB result"
                                onFileSelect={(file) =>
                                    handleFileUpload("jambResultFile", file)
                                }
                                accept=".pdf,.jpg,.jpeg,.png"
                            />

                            <div className="mt-4 grid gap-y-1.5">
                                <p className="text-grey-500 text-[0.9375rem]">
                                    * The size of the image should not exceed
                                    1MB.
                                </p>
                                <p className="text-grey-500 text-[0.9375rem]">
                                    * Please ensure the image is in either JPEG
                                    or PNG format.
                                </p>
                                <p className="text-grey-500 text-[0.9375rem]">
                                    * PDF files are also accepted.
                                </p>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary disabled:bg-grey-100 disabled:text-grey-200 hover:bg-primary/90 ml-auto h-14 w-fit rounded-xl border-none px-10 py-3 font-semibold text-white transition-colors"
                >
                    {isSubmitting ? "Submitting..." : "Save and Preview"}
                </button>
            </div>
        </form>
    );
}

// Reusable FormField Component
interface FormFieldProps {
    label: string;
    name: string;
    register: any;
    error?: any;
    type?: string;
    required?: boolean;
    options?: string[];
    min?: number;
    max?: number;
}

function FormField({
    label,
    name,
    register,
    error,
    type = "text",
    required = false,
    options = [],
    min,
    max,
}: FormFieldProps) {
    return (
        <div className="grid grow gap-y-0.5">
            <Label className="text-sm">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </Label>

            {type === "select" ? (
                <select
                    className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
                    {...register(name)}
                >
                    <option value="">Select {label.toLowerCase()}</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    className="focus:ring-primary w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:outline-none"
                    {...register(name)}
                    min={min}
                    max={max}
                    step={type === "number" ? "1" : undefined}
                />
            )}

            {error && <FormError message={error.message} />}
        </div>
    );
}

// O'Level Grade Table Component
interface OLevelGradeTableProps {
    sittingIndex: number;
    control: any;
    register: any;
    errors: any;
}

function OLevelGradeTable({
    sittingIndex,
    control,
    register,
    errors,
}: OLevelGradeTableProps) {
    const { fields } = useFieldArray({
        control,
        name: `olevelResults.${sittingIndex}.subjects`,
    });

    return (
        <div className="border-grey-100 grid grid-cols-3 border">
            <p className="text-primary border-grey-100 col-span-3 border-b py-2 text-center text-sm font-medium">
                Subjects and Grades
            </p>

            {/* Subjects column */}
            <div className="col-span-2">
                <p className="font-inter text-grey-500 border-b-grey-100 border-b py-2 text-center text-sm font-medium">
                    Subject
                </p>
                {fields.map((field, subjectIndex) => (
                    <div
                        key={field.id}
                        className="border-grey-100 border-b last:border-0"
                    >
                        <input
                            type="text"
                            className={`focus:border-primary h-10 w-full px-3 py-2 text-[0.9375rem] focus:outline-none ${
                                COMPULSORY_SUBJECTS.includes(field.subject)
                                    ? "bg-gray-50 text-gray-700"
                                    : "text-grey-500"
                            }`}
                            placeholder="Enter a subject"
                            {...register(
                                `olevelResults.${sittingIndex}.subjects.${subjectIndex}.subject`,
                            )}
                            readOnly={COMPULSORY_SUBJECTS.includes(
                                field.subject,
                            )}
                        />
                    </div>
                ))}
            </div>

            {/* Grades column */}
            <div className="border-l-grey-100 border-l">
                <p className="font-inter text-grey-500 border-b-grey-100 border-b py-2 text-center text-sm font-medium">
                    Grade
                </p>
                {fields.map((field, subjectIndex) => (
                    <div
                        key={field.id}
                        className="border-grey-100 border-b last:border-0"
                    >
                        <GradeSelect
                            name={`olevelResults.${sittingIndex}.subjects.${subjectIndex}.grade`}
                            register={register}
                            defaultValue={field.grade}
                        />
                    </div>
                ))}
            </div>

            {errors.olevelResults?.[sittingIndex]?.subjects && (
                <div className="col-span-3 border-t border-red-200 bg-red-50 p-2">
                    <FormError
                        message={
                            errors.olevelResults[sittingIndex]!.subjects!
                                .message
                        }
                    />
                </div>
            )}
        </div>
    );
}

// File Upload Component
interface FileUploadProps {
    label: string;
    onFileSelect: (file: File) => void;
    accept?: string;
}

function FileUpload({ label, onFileSelect, accept }: FileUploadProps) {
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (1MB max)
            if (file.size > 1024 * 1024) {
                alert("File size must be less than 1MB");
                return;
            }

            // Validate file type
            const validTypes = accept?.split(",") || [
                ".pdf",
                ".jpg",
                ".jpeg",
                ".png",
            ];
            const fileExtension =
                "." + file.name.split(".").pop()?.toLowerCase();

            if (
                !validTypes.some(
                    (type) => type.trim().toLowerCase() === fileExtension,
                )
            ) {
                alert(
                    "Invalid file type. Please upload a PDF, JPEG, or PNG file.",
                );
                return;
            }

            setFileName(file.name);
            onFileSelect(file);
        }
    };

    return (
        <div className="col-span-2">
            <Label className="mb-2 block text-sm">{label}</Label>
            <label className="relative cursor-pointer">
                <div className="border-primary bg-primary/5 hover:bg-primary/10 flex h-[60px] w-full items-center justify-center gap-x-2 rounded-lg border-2 border-dashed transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                    >
                        <path d="M12 3v12" />
                        <path d="m17 8-5-5-5 5" />
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    </svg>
                    <span className="text-primary font-medium">
                        {fileName
                            ? fileName
                            : `Click to upload ${label.toLowerCase()}`}
                    </span>
                </div>
                <input
                    type="file"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    onChange={handleFileChange}
                    accept={accept}
                />
            </label>
        </div>
    );
}

function PersonalInformation({ control }: { control: any }) {
    const [date, setDate] = useState<Date | null>(null);

    return (
        <FieldsetWrapper title="Personal Information">
            <div className="grid grid-cols-2 items-start gap-x-14 gap-y-7">
                <FieldWrapper
                    name="surname"
                    label="Surname"
                    control={control}
                    placeholder="Enter your surname"
                />
                <FieldWrapper
                    name="middleName"
                    label="Middle name"
                    control={control}
                    placeholder="Enter your middle name"
                />
                <FieldWrapper
                    name="lastName"
                    label="Last name"
                    control={control}
                    placeholder="Enter your last name"
                />
                {/* <FieldWrapper
          name="dateOfBirth"
          label="Date of Birth"
          control={control}
          type="date"
        /> */}
                <DatePicker
                    value={date}
                    onChange={setDate}
                    placeholder="Pick a date"
                    weekStartsOn={1}
                />
                <FieldWrapper
                    name="gender"
                    label="Gender"
                    control={control}
                    type="select"
                    items={[
                        { value: null, label: "Select your gender" },
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                    ]}
                />

                <p className="text-grey-500 col-span-2 text-[0.9375rem]">
                    * Please ensure all information provided is accurate and
                    complete as they will be used to verify your identity.
                </p>
            </div>
        </FieldsetWrapper>
    );
}
