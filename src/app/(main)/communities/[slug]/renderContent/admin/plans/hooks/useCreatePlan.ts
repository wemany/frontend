import { useSWRConfig } from "swr";
import { CreatePlanForm } from "../lib/schema/plan.schema";
import { createPlan } from "../lib/api";
import { TransformedData } from "@/app/(main)/profile/types/api.types";
import { useState } from "react";

export const useCreatePlan = (
  communityId: string,
  communityData: TransformedData | null
) => {
  const [openModal, setOpenModal] = useState(false);
  const { mutate } = useSWRConfig();

  const planKey = `/api/plans/getPlans/${communityId}`;

  const handleSubmitPlan = async (
    formData: CreatePlanForm,
    callbacks?: { onComplete: () => void; onError: () => void }
  ) => {
    try {
      await createPlan(formData, communityId, communityData);
      mutate(planKey);
      callbacks?.onComplete?.();
    } catch (error) {
      console.error("Error creating plan:", error);
      callbacks?.onError();
    }
  };

  return {
    openModal,
    setOpenModal,
    handleSubmitPlan,
  };
};
