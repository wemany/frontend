import { useSWRConfig } from "swr";
import { CreatePlanForm } from "../lib/schema/plan.schema";
import { createPlan } from "../lib/api";

export const useCreatePlan = (communityId: string) => {
  const { mutate } = useSWRConfig();

  const planKey = `/api/plans/getPlans/${communityId}`;

  const handleCreatePlan = async (
    formData: CreatePlanForm,
    callbacks?: { onSuccess: () => void; onError: () => void }
  ) => {
    try {
      await createPlan(formData, communityId);
      mutate(planKey);
      callbacks?.onSuccess?.();
    } catch (error) {
      console.error("Error creating plan:", error);
      callbacks?.onError();
    }
  };

  return {
    handleCreatePlan,
  };
};
