"use client";

import { useEffect, useState } from "react";
import { ApiDataProfile } from "../types/profile.type";

export const useProfileData = () => {
  const [data, setData] = useState<ApiDataProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/profile`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log({ result });
        setData(result);
      } catch (error) {
        console.error("Error fetching community data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  return {
    isLoading,
    data,
  };
};
