
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("invalidEmail"),
  password: z
    .string()
    .min(8, "passwordLength")
    .max(100, "passwordTooLong"),
});

export type loginSchemaType = z.infer<typeof loginSchema>;