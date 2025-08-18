"use client";
import { Category } from "@/types/category";
import useSWR from "swr";

export const useGetCategories = () => {
  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      console.error("Error getting categories: ", result.message);
      throw new Error(result.message);
    }
    return result;
  };

  const url = "/api/category/getCategories";

  const { data, error, isLoading } = useSWR<Category[]>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  if (!data) {
    return {
      isLoading: isLoading,
      data: [],
      error,
    };
  }

  return {
    isLoading: isLoading,
    data,
    error,
  };
};
