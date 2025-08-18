"use client";
import useSWR from "swr";
import { Role } from "../types/role.type";

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  if (!response.ok) {
    console.error("Error getting Roles: ", result.message);
    throw new Error(result.message);
  }

  return result;
};

export const useGetRoles = (communityId: string) => {
  const url = `/api/role/getRoles/${communityId}`;

  const { data, error, isLoading, mutate } = useSWR<Role[]>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });

  if (!data) {
    return {
      isLoading: isLoading,
      data: data || [],
      error,
      mutate,
    };
  }

  return {
    isLoading: isLoading,
    data,
    error,
    mutate,
  };
};
