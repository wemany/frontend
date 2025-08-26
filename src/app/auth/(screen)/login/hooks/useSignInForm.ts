"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SignInFormValues,
  signinSchema,
} from "@/app/auth/lib/schema/signin.schema";
import { signIn } from "next-auth/react";

export const useSignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signinSchema),
  });
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true);
    setSubmissionStatus("idle");
    setMessage("");

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl,
      });
      if (!response?.error) {
        setSubmissionStatus("success");
        setMessage("Login successful");
        reset();
        router.push(callbackUrl);
      } else {
        setSubmissionStatus("error");
        setMessage(response?.error);
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
    watch,
    errors,
    isSubmitting: isLoading,
    isValid,
    submissionStatus,
    message,
  };
};
