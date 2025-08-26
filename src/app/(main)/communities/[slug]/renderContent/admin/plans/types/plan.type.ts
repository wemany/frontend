import { Control, UseFormReturn } from "react-hook-form";
import { CreatePlanForm } from "../lib/schema/plan.schema";
import { Role } from "../../roles/types/role.type";
import { TransformedData } from "@/app/(main)/profile/types/api.types";

export interface Plan {
  id: string;
  name: string;
  benefits: string[];
  description: string;
  price: number;
  currency_id: string;
  currency_code?: string;
  roles?: [
    {
      id: string;
      name: string;
      color: string;
    }
  ];
  duration_unit: "day" | "week" | "month" | "year";
  duration_value: number;
  is_recurring: boolean;
  color: string;
}

export type PlanFormValues = CreatePlanForm;

export interface CreatePlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PlanFormValues) => void | Promise<void>;
  planToEdit?: Plan | null;
  data: TransformedData;
  roles?: Role[];
}

export interface ModalFormProps {
  form: UseFormReturn<PlanFormValues>;
  data: TransformedData;
  role: Role[];
  plans?: Plan[];
  isEditing: boolean;
  isFormValid: () => boolean;
  onSubmit: (data: PlanFormValues) => void | Promise<void>;
}

export type FormControl = Control<CreatePlanForm>;

export interface PlanDurationProps {
  control: FormControl;
  plan: {
    duration_unit: string;
    duration_value: number;
  };
  handlePlanUpdate: (field: PlanFieldKey, value: string | number) => void;
}

export interface PlanBenefitsProps {
  control: FormControl;
  benefits: string[];
  onAddBenefit: () => void;
  onRemoveBenefit: (benefitIndex: number) => void;
}

export interface PlanFieldProps {
  control: FormControl;
  error?: string;
}

export type PlanFieldKey =
  | "name"
  | "description"
  | "color"
  | "price"
  | "role"
  | "currency"
  | "duration_unit"
  | "duration_value"
  | "is_recurring"
  | "benefits"
  | `benefits.${number}`;
