"use client";
import useSWR from "swr";
import { ApiComunities } from "../types/communties";

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  if (!response.ok) {
    console.error("Error getting community: ", result.message);
    throw new Error(result.message);
  }

  return result;
};

export const useGetCommunities = (page: number, perPage: number) => {
  const url = `/api/community/getCommunities?page=${page}&limit=${perPage}`;

  const { data, error, isLoading, mutate } = useSWR<ApiComunities>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );
  if (!data) {
    return {
      isLoading: isLoading,
      data: data || { total: 0, communities: [] },
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
