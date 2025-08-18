import { useState } from "react";
import { useSWRConfig } from "swr";
import { Plan } from "../types/plan.type";
import { deletePlan } from "../lib/api";

export const useDeletePlan = (communityId: string) => {
  const [planToDelete, setPlanToDelete] = useState<Plan | null>(null);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const plansKey = `/api/plans/deletePlan/${communityId}`;

  const handleDeleteClick = (plan: Plan) => {
    setPlanToDelete(plan);
    setIsDialogDeleteOpen(true);
  };

  const handleConfirmDelete = async (callbacks?: {
    onComplete: () => void;
    onError: () => void;
  }) => {
    if (planToDelete) {
      try {
        await deletePlan(planToDelete.id);
        setIsDialogDeleteOpen(false);
        setPlanToDelete(null);
        mutate(plansKey);
        callbacks?.onComplete();
      } catch (error) {
        console.error("Error deleting plan:", error);
        callbacks?.onError();
      }
    }
  };

  return {
    isDialogDeleteOpen,
    planToDelete,
    setIsDialogDeleteOpen,
    setPlanToDelete,
    handleDeleteClick,
    handleConfirmDelete,
  };
};
