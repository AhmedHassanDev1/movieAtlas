import * as z from "zod"

export const signUpSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, "firstNameLength")
        .max(50, "firstNameTooLong"),

    lastName: z
        .string()
        .trim()
        .min(2, "lastNameLength")
        .max(50, "lastNameTooLong"),

    email: z
        .email("invalidEmail"),

    password: z
        .string()
        .min(8, "passwordLength")
        .max(100, "passwordTooLong"),
});

export type signUpSchemaType = z.infer<typeof signUpSchema>
// password: z
//   .string()
//   .min(8, "Password must be at least 8 characters")
//   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//   .regex(/[0-9]/, "Password must contain at least one number")