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
        email: z
            .email("Please enter a valid email address")
            .trim()
            .toLowerCase(),
        phoneNumber: z
            .string()
            .startsWith(
                "+234",
                'Phone number must start with "+234", e.g. "+2348100011000"',
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

// prettier-ignore
export const gradeSchema = z.enum([ "A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9", "N/A" ]);
// prettier-ignore
export const examTypeSchema = z.enum([ "WAEC", "NECO", "NABTEB", "WAEC/GCE", "NECO/GCE" ]);

export const oLevelSubjectSchema = z.object({
    subject: z.string().min(1, "Subject is required"),
    grade: gradeSchema,
});

export const oLevelSittingSchema = z.object({
    type: examTypeSchema,
    examinationNumber: z.string().min(1, "Examination number is required"),
    year: z
        .string()
        .min(4, "Year must be 4 digits")
        .max(4, "Year must be 4 digits")
        .regex(/^\d{4}$/, "Year must be a valid 4-digit year"),
    subjects: z
        .array(oLevelSubjectSchema)
        .min(8, "At least 8 subjects must be provided")
        .refine((subjects) => {
            // Check that at least 8 subjects have both subject and grade
            const validSubjects = subjects.filter(
                (sub) => sub.subject.trim() && sub.grade !== "N/A",
            );
            return validSubjects.length >= 8;
        }, "At least 8 valid subjects with grades are required"),
});

export const applicationSchema = z.object({
    // Personal Information
    surname: z.string().min(1, "Surname is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    gender: z.enum(["male", "female"], "Select a gender"),

    // Address Information
    nationality: z.string().min(1, "Nationality is required"),
    stateOfOrigin: z.string().min(1, "State of origin is required"),
    lgaOfOrigin: z.string().min(1, "LGA of origin is required"),
    residentialAddress: z.string().min(1, "Residential address is required"),

    // Educational Information
    programmeOfStudy: z.string().min(1, "Programme of study is required"),
    jambCampus: z.string().min(1, "JAMB campus is required"),

    // O'Level Results
    olevelResults: z
        .array(oLevelSittingSchema)
        .min(1, "At least one O'Level sitting is required")
        .max(2, "Maximum of two sittings allowed"),

    // JAMB Information
    jambRegNumber: z.string().min(1, "JAMB registration number is required"),
    jambScore: z
        .string()
        .min(1, "JAMB score is required")
        .regex(/^\d+$/, "JAMB score must be a number")
        .transform(Number)
        .refine(
            (score) => score >= 0 && score <= 400,
            "JAMB score must be between 0 and 400",
        ),

    // Files (optional for schema, but required in form)
    olevelResultFile: z.instanceof(File).optional(),
    jambResultFile: z.instanceof(File).optional(),
});

export type ApplicationInputs = z.infer<typeof applicationSchema>;
