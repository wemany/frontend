"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCommunitySchema,
  type CreateCommunityForm,
} from "../lib/schema/community.schema";
import {
  COMMUNITY_STEPS,
  DURATION_LIMITS,
  DURATION_UNITS_VALUES,
  DURATION_VALUE,
  MAX_STEPS,
  PLAN_LIMITS,
} from "../lib/constants/community.constants";
import { PlanFieldKey, PlanFieldValue } from "../types/community.types";
import { CreatePlanForm } from "../../communities/[slug]/renderContent/admin/plans/lib/schema/plan.schema";

const DEFAULT_PLAN: CreatePlanForm = {
  name: "",
  description: "",
  color: "",
  price: 0,
  currency: "USD",
  duration_unit: DURATION_UNITS_VALUES[0],
  duration_value: DURATION_VALUE.MIN,
  is_recurring: false,
  benefits: [""],
};

const DEFAULT_VALUES: CreateCommunityForm = {
  name: "",
  description: "",
  category: "",
  language: "es",
  type: "public",
  isPublic: true,
  tags: [],
  currentTag: "",
  plans: [DEFAULT_PLAN],
  banner: "",
  logo: "",
};

export function useCommunityForm(initialData?: CreateCommunityForm | null) {
  console.log({ initialData });
  const [currentStep, setCurrentStep] = useState<number>(
    COMMUNITY_STEPS.BASIC_INFO
  );

  const form = useForm<CreateCommunityForm>({
    resolver: zodResolver(createCommunitySchema),
    defaultValues: initialData || DEFAULT_VALUES,
    mode: "onTouched",
  });

  const { watch, setValue, getValues, trigger } = form;

  const watchedValues = watch();

  const goToNextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < MAX_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > COMMUNITY_STEPS.BASIC_INFO) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    switch (currentStep) {
      case COMMUNITY_STEPS.BASIC_INFO:
        return await trigger([
          "name",
          "description",
          "category",
          "language",
          "type",
          "banner",
          "logo",
        ]);
      case COMMUNITY_STEPS.TAGS:
        return await trigger(["tags"]);
      case COMMUNITY_STEPS.PRICING:
        return await trigger(["plans"]);
      default:
        return false;
    }
  };

  const addTag = (tag: string) => {
    const currentTags = getValues("tags");
    const trimmedTag = tag.trim();

    if (trimmedTag && !currentTags.includes(trimmedTag)) {
      setValue("tags", [...currentTags, trimmedTag], {
        shouldValidate: true,
        shouldTouch: true,
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = getValues("tags");
    setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove),
      { shouldValidate: true, shouldTouch: true }
    );
  };

  const updatePlan = (
    index: number,
    field: PlanFieldKey,
    value: PlanFieldValue
  ) => {
    const currentPlans = getValues("plans");
    const updatedPlans = [...currentPlans];
    const updatedPlan = { ...updatedPlans[index], [field]: value };

    if (field === "price") {
      const price = value as number;
      if (price === 0) {
        updatedPlan.is_recurring = false;
        updatedPlan.duration_unit = DURATION_UNITS_VALUES[0];
        updatedPlan.duration_value = 0;
      }
    }

    if (field === "is_recurring") {
      const isRecurring = value as boolean;
      if (isRecurring) {
        // Plan recurrente: necesita duración
        if (updatedPlan.duration_unit === DURATION_UNITS_VALUES[0]) {
          updatedPlan.duration_unit = DURATION_UNITS_VALUES[3];
          updatedPlan.duration_value = 1;
        }
      } else {
        // Pago único: sin duración
        updatedPlan.duration_unit = DURATION_UNITS_VALUES[0];
        updatedPlan.duration_value = 0;
      }
    }

    // Si cambia la unidad de duración
    if (field === "duration_unit") {
      const unit = value as string;
      if (unit === "none") {
        updatedPlan.duration_value = 0;
        updatedPlan.is_recurring = false;
      } else if (updatedPlan.price > 0) {
        updatedPlan.is_recurring = true;
        if (updatedPlan.duration_value === 0) {
          updatedPlan.duration_value = 1;
        }
      }
    }

    if (field === "duration_value") {
      const unit = updatedPlan.duration_unit as keyof typeof DURATION_LIMITS;
      const maxLimit = DURATION_LIMITS[unit].max;
      const numericValue = Number(value);

      if (numericValue > maxLimit) {
        updatedPlan.duration_value = maxLimit;
      } else {
        updatedPlan.duration_value = numericValue;
      }

      if (updatedPlan.duration_value < DURATION_VALUE.MIN) {
        updatedPlan.duration_value = DURATION_VALUE.MIN;
      }
    }

    updatedPlans[index] = updatedPlan;
    setValue("plans", updatedPlans, {
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const addPlan = () => {
    const currentPlans = getValues("plans");

    if (currentPlans.length < PLAN_LIMITS.MAX_PLANS) {
      setValue("plans", [...currentPlans, { ...DEFAULT_PLAN }], {
        shouldValidate: true,
        shouldTouch: true,
      });
    }
  };

  const removePlan = (index: number) => {
    const currentPlans = getValues("plans");

    if (currentPlans.length > PLAN_LIMITS.MIN_PLANS) {
      setValue(
        "plans",
        currentPlans.filter((_, i) => i !== index),
        { shouldValidate: true, shouldTouch: true }
      );
    }
  };

  const addBenefitToPlan = (planIndex: number) => {
    const currentPlans = getValues("plans");
    const updatedPlans = [...currentPlans];
    updatedPlans[planIndex].benefits.push("");
    setValue("plans", updatedPlans, {
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const removeBenefitFromPlan = (planIndex: number, benefitIndex: number) => {
    const currentPlans = getValues("plans");
    const updatedPlans = [...currentPlans];

    if (updatedPlans[planIndex].benefits.length > 1) {
      updatedPlans[planIndex].benefits = updatedPlans[
        planIndex
      ].benefits.filter((_, i) => i !== benefitIndex);
      setValue("plans", updatedPlans, {
        shouldValidate: true,
        shouldTouch: true,
      });
    }
  };

  const resetForm = () => {
    form.reset(initialData || DEFAULT_VALUES);
    setCurrentStep(COMMUNITY_STEPS.BASIC_INFO);
  };

  const canAddPlan = () => {
    const currentPlans = getValues("plans");
    return currentPlans.length < PLAN_LIMITS.MAX_PLANS;
  };

  const canRemovePlan = () => {
    const currentPlans = getValues("plans");
    return currentPlans.length > PLAN_LIMITS.MIN_PLANS;
  };

  console.log({ form: form.getValues() });

  return {
    form,
    currentStep,
    watchedValues,
    goToNextStep,
    goToPreviousStep,
    addTag,
    removeTag,
    updatePlan,
    addPlan,
    removePlan,
    addBenefitToPlan,
    removeBenefitFromPlan,
    resetForm,
    canAddPlan,
    canRemovePlan,
    isLastStep: currentStep === MAX_STEPS,
    isFirstStep: currentStep === COMMUNITY_STEPS.BASIC_INFO,
  };
}
