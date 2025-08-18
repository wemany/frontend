"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useVerifyAccount = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const sendToken = async () => {
      if (!token) {
        setMessage("Error verifying your account..");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setMessage("Verifying your account...");

        const url = `/api/auth/verifyAccount?token=${encodeURIComponent(
          token
        )}`;

        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        if (response.ok) {
          setMessage(result.message);
        } else {
          setMessage(result.message);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          setMessage(error.message || "An unexpected error occurred.");
        } else {
          console.error("Submission error:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    sendToken();
  }, [token]);

  const handleRedirect = () => {
    router.push("/auth/login");
  };
  return { isLoading, message, handleRedirect };
};
