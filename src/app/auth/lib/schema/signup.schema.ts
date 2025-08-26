import { z } from "zod";
import { isValidPhoneNumber as checkValidPhoneNumber } from "libphonenumber-js";

export const signupSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .min(10, "Phone number is required")
      .refine(
        (value) => checkValidPhoneNumber(value, { defaultCallingCode: "57" }),
        {
          message: "Por favor, ingresa un número de teléfono válido.",
        }
      ),
    password: z
      .string()
      .min(6, "The password must be at least 6 characters.")
      .regex(/[A-Z]/, "The password must contain at least one capital letter.")
      .regex(
        /[a-z]/,
        "The password must contain at least one lowercase letter."
      )
      .regex(/[0-9]/, "The password must contain at least one number.")
      .regex(
        /[^a-zA-Z0-9]/,
        "The password muest contain at least one special character."
      ),
    confirmPassword: z.string().nonempty({
      message: "Please enter a confirm password.",
    }),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
