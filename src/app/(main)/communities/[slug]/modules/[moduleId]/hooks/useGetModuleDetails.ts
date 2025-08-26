import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);

  const result = await response.json();

  if (!response.ok) {
    console.error("Error getting community: ", result.message);
    throw new Error(result.message);
  }
  return result;
};

export const useGetModuleDetails = (moduleId: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/modules/getModuleDetails/${moduleId}`,
    fetcher
  );

  return {
    module: data,
    error,
    isLoading,
  };
};
