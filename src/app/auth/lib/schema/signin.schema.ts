import { z } from "zod";

export const signinSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .nonempty({ message: "Password is required" }),
  remember: z.boolean().optional(),
});

export type SignInFormValues = z.infer<typeof signinSchema>;
