import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePlanForm, createPlanSchema } from "../lib/schema/plan.schema";
import {
  DURATION_UNITS_VALUES,
  DURATION_VALUE,
} from "@/app/(main)/profile/lib/constants/community.constants";

const DEFAULT_VALUES: CreatePlanForm = {
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

export function usePlanForm() {
  const form = useForm<CreatePlanForm>({
    resolver: zodResolver(createPlanSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
  });

  const isFormValid = () => {
    return form.formState.isValid;
  };

  return {
    form,
    isFormValid,
  };
}
