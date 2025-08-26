"use client";

import { useForm } from "react-hook-form";
import {
  SignupFormValues,
  signupSchema,
} from "../../../lib/schema/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    control,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setSubmissionStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.status === 200) {
        setSubmissionStatus("success");
        setMessage(result.message);
        router.push(`/auth/email-confirmation?email=${data.email}`);
        reset();
      } else {
        setSubmissionStatus("error");
        setMessage(result.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    router.push("/");
  };
  return {
    register,
    handleSubmit,
    onSubmit,
    watch,
    handleClose,
    trigger,
    errors,
    control,
    isSubmitting: isLoading,
    isValid,
    submissionStatus,
    message,
  };
};
