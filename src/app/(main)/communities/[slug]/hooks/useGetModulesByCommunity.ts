import useSWR from "swr";
import { ApiResponseModule } from "../renderContent/admin/modules/types/module.type";

export const useGetModulesByCommunity = ({
  communityId,
  shouldFetch,
}: {
  communityId: string | undefined;
  shouldFetch: boolean;
}) => {
  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      console.error("Error getting modules: ", result.message);
      throw new Error(result.message);
    }

    return result;
  };

  const url = shouldFetch ? `/api/modules/${communityId}/getModules` : null;

  const { data, error, isLoading } = useSWR<ApiResponseModule>(url, fetcher, {
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
    data: data.modules,
    error,
  };
};
