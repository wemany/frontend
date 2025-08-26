"use client";

import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/app/auth/lib/schema/forgotPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setSubmissionStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/auth/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.status === 200) {
        setSubmissionStatus("success");
        setMessage("Email sent successfully!");
        router.push(`/auth/forgot-password-confirmation?email=${data.email}`);
      } else {
        setSubmissionStatus("error");
        setMessage(result.message);
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    isSubmitting: isLoading,
    errors,
    message,
    submissionStatus,
    isValid,
  };
};
