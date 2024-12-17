import { z } from "zod";

export const forgotPasswordValidationSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .nonempty({ message: "Email is required" }),
});
