"use client";
import useSWR from "swr";

export interface DashboardCommunityStats {
  modules_count: string;
  subscription_plans_count: string;
  classes_count: string;
  users_count: string;
  posts_count: string;
}

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  if (!response.ok) {
    console.error("Error getting Stats: ", result.message);
    throw new Error(result.message);
  }
  return result;
};

export const useStatsCommunitySidebar = ({ slug }: { slug: string }) => {
  const url = `/api/community/getCommunityStats/${slug}`;

  const { data, error, isLoading } = useSWR<DashboardCommunityStats[]>(
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
