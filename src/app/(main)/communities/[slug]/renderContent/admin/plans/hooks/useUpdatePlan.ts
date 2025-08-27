import { useState } from "react";
import { useSWRConfig } from "swr";
import { Plan } from "../types/plan.type";
import { CreatePlanForm } from "../lib/schema/plan.schema";
import { updatePlan } from "../lib/api";
import { TransformedData } from "@/app/(main)/profile/types/api.types";

export const useUpdatePlan = (
  communityId: string,
  communityData: TransformedData | null,
  fetchCommunityData: () => Promise<void>
) => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [planToEdit, setPlanToEdit] = useState<Plan | null>(null);
  const { mutate } = useSWRConfig();

  const planKey = `/api/plan/getPlans/${communityId}`;

  const handleEditClick = async (plan: Plan) => {
    setIsLoading(true);
    await fetchCommunityData();
    setPlanToEdit(plan);
    setOpenModal(true);
    setIsLoading(false);
  };

  const handleSubmitUpdate = async (
    formData: CreatePlanForm,
    callback?: { onComplete: () => void; onError: () => void }
  ) => {
    if (!planToEdit) return;

    try {
      await updatePlan(planToEdit.id, communityId, formData, communityData);
      mutate(planKey);
      callback?.onComplete();
    } catch (error) {
      console.error("Error updating plan:", error);
      callback?.onError();
    }
  };

  return {
    openModal,
    planToEdit,
    isLoading,
    setOpenModal,
    handleEditClick,
    handleSubmitUpdate,
  };
};
