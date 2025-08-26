// ... otros imports
import { fetcher } from "@/lib/fetcher";
import useSWRMutation from "swr/mutation";
import useSWR, { useSWRConfig } from "swr";
import { ApiResponseModule, Module } from "../types/module.type";

interface ReorderModulesPayload {
  newOrder: { id: string; index: number }[]; // El payload ahora es un arreglo de objetos
}

// El `fetcher` para la mutación ahora recibe el nuevo formato
const reorderFetcher = async (
  url: string,
  { arg }: { arg: ReorderModulesPayload }
) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg.newOrder), // Envía el arreglo directamente
  });

  const result = await response.json();
  if (!response.ok) {
    console.error(
      "❌ Error al actualizar el orden de los módulos:",
      result.message
    );
    throw new Error(result.message || `Server error: ${response.status}`);
  }
  return result;
};

export const useReorderModules = (communityId: string) => {
  const swrKey = `/api/modules/${communityId}/getModules`;
  const reorderKey = `/api/modules/${communityId}/hierarchy`;
  const { mutate } = useSWRConfig();

  const { data, error, isLoading } = useSWR<ApiResponseModule>(swrKey, fetcher);
  const { trigger, isMutating } = useSWRMutation(reorderKey, reorderFetcher);

  const handleReorder = async (newOrder: string[]) => {
    const formattedOrder = newOrder.map((id, index) => ({
      id,
      index: index + 1,
    }));
    const optimisticData = {
      modules: formattedOrder
        .map(
          ({ id }) => data?.modules.find((module) => module.id === id) as Module
        )
        .filter(Boolean),
    };

    const options = {
      optimisticData,
      rollbackOnError: true,
      populateCache: true,
      revalidate: true,
    };

    await trigger({ newOrder: formattedOrder }, options);
  };

  return {
    modules: data?.modules || [],
    isLoading: isLoading,
    error,
    isReordering: isMutating,
    handleReorder,
    mutate,
  };
};
