import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export const useGetPlans = (communityId: string) => {
  const url = `/api/plans/getPlans/${communityId}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  if (!data) {
    return {
      isLoading: isLoading,
      data: data || [],
      error,
      mutate,
    };
  }

  console.log({ data });

  return {
    isLoading: isLoading,
    data,
    error,
    mutate,
  };
};
