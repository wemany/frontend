"use client";

import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/app/auth/lib/schema/resetPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

export const useResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const onSubmit = async (data: ResetPasswordFormValues) => {
    const sendData = { ...data, token: searchParams.get("token") ?? "" };

    try {
      const response = await fetch("/api/auth/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();

      if (response.status === 200) {
        router.push("/auth/reset-password-confirmation");
      } else {
        console.error("Error:", result.errors);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    watch,
    errors,
    isValid,
    isSubmitting,
  };
};
