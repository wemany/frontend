"use client";

import type { UseFormReturn } from "react-hook-form";
import { CreateCommunityForm } from "../lib/schema/community.schema";

interface UseHandlersProps {
  form: UseFormReturn<CreateCommunityForm>;
  isFirstStep: boolean;
  isLastStep: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CreateCommunityForm) => void | Promise<void>;
  resetForm: () => void;
  goToNextStep: () => Promise<void>;
  goToPreviousStep: () => void;
}

interface UseHandlersReturn {
  handleClose: () => void;
  handleBack: () => void;
  handleNext: () => Promise<void>;
}

export function useHandlers({
  form,
  isFirstStep,
  isLastStep,
  onOpenChange,
  onSubmit,
  resetForm,
  goToNextStep,
  goToPreviousStep,
}: UseHandlersProps): UseHandlersReturn {
  const handleClose = () => {
    onOpenChange(false);
    resetForm();
  };

  const handleBack = () => {
    if (isFirstStep) {
      handleClose();
    } else {
      goToPreviousStep();
    }
  };

  const handleNext = async () => {
    if (isLastStep) {
      const isValid = await form.trigger();
      const formData = form.getValues();
      if (isValid) {
        await onSubmit?.(formData);
        handleClose();
      }
    } else {
      await goToNextStep();
    }
  };

  return {
    handleClose,
    handleBack,
    handleNext,
  };
}
