import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePlanForm, createPlanSchema } from "../lib/schema/plan.schema";

const DEFAULT_VALUES: CreatePlanForm = {
  name: "",
  description: "",
  color: "",
  price: 0,
  currency: "",
  duration_unit: "none",
  duration_value: 0,
  is_recurring: false,
  features: [],
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
