import z from "zod";

export const resetPasswordSchema = z
  .object({
    token: z.string({ required_error: "Token is required" }).optional(),
    password: z
      .string({ required_error: "Password is required" })
      .nonempty({ message: "Password is required" }),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .nonempty({ message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
