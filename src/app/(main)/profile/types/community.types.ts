import { UseFormReturn } from "react-hook-form";
import {
  CreateCommunityForm,
  EditCommunityForm,
} from "../lib/schema/community.schema";
import { FormControl } from "./form.types";
import { TransformedData } from "./api.types";
import { CreatePlanForm } from "../../communities/[slug]/renderContent/admin/plans/lib/schema/plan.schema";

export interface Category {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly icon: string;
}

export interface Language {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly flag: string;
}

export interface Currency {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly symbol: string;
}

export interface EditCommunityData {
  id?: string;
  name?: string;
  description?: string;
  banner?: string;
  logo?: string;
}

export interface BasicInfoStepProps {
  form: UseFormReturn<CreateCommunityForm>;
  communityData: TransformedData;
}

export interface KeywordsStepProps {
  form: UseFormReturn<CreateCommunityForm>;
  onAddKeyword: (keyword: string) => void;
  onRemoveKeyword: (keyword: string) => void;
}

export interface PricingStepProps {
  form: UseFormReturn<CreateCommunityForm>;
  communityData: TransformedData;
  canAddPlan: boolean;
  canRemovePlan: boolean;
  onAddPlan: () => void;
  onRemovePlan: (index: number) => void;
  onAddFeature: (planIndex: number) => void;
  onRemoveFeature: (planIndex: number, featureIndex: number) => void;
  onUpdatePlan: (
    index: number,
    field: PlanFieldKey,
    value: PlanFieldValue
  ) => void;
}

export interface PlanCardProps {
  plan: CreatePlanForm;
  planIndex: number;
  form: UseFormReturn<CreateCommunityForm>;
  canRemove: boolean;
  communityData: TransformedData;
  onRemove: () => void;
  onAddFeature: (planIndex: number) => void;
  onRemoveFeature: (planIndex: number, featureIndex: number) => void;
  onUpdatePlan: (
    index: number,
    field: PlanFieldKey,
    value: PlanFieldValue
  ) => void;
}

export interface KeywordsListProps {
  keywords: string[];
  onRemove: (keyword: string) => void;
}

export interface BaseOptionProps<T extends string | boolean> {
  type: T;
  isSelected: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  onSelect: () => void;
}

export interface CommunityTypeOptionProps
  extends BaseOptionProps<"public" | "private"> {}

export interface BaseTypeSelectorProps<T extends string | boolean> {
  selectedType: T;
  error?: string;
  onTypeChange: (type: T) => void;
  label: string;
  options: Omit<BaseOptionProps<T>, "isSelected" | "onSelect">[];
}

export interface PlanCardHeaderProps {
  planIndex: number;
  canRemove: boolean;
  onRemove: () => void;
}

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export interface CreateCommunityModalProps {
  open: boolean;
  communityData: TransformedData;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CreateCommunityForm) => void | Promise<void>;
}

export interface ModalHeaderSectionProps {
  currentStep: number;
  totalSteps: number;
}

export interface ModalFooterProps {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
}

export interface PlanBasicFieldsProps {
  control: FormControl;
  planIndex: number;
  currencies: Currency[];
  isFreePlan: boolean;
  handlePlanUpdate: (field: PlanFieldKey, value: PlanFieldValue) => void;
}

export interface PlanDurationProps {
  control: FormControl;
  planIndex: number;
  plan: CreatePlanForm;
  handlePlanUpdate: (field: PlanFieldKey, value: PlanFieldValue) => void;
}

export interface PlanFeaturesProps {
  control: FormControl;
  planIndex: number;
  features: string[];
  onAddFeature: () => void;
  onRemoveFeature: (featureIndex: number) => void;
}

export interface KeywordInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onAdd: () => void;
  disabled?: boolean;
}

export interface KeywordSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export interface AddPlanButtonProps {
  canAdd: boolean;
  currentPlansCount: number;
  maxPlans: number;
  onAdd: () => void;
}

export interface StepRendererProps {
  currentStep: number;
  form: UseFormReturn<CreateCommunityForm>;
  canAddPlan: boolean;
  canRemovePlan: boolean;
  communityData: TransformedData;
  onAddKeyword: (keyword: string) => void;
  onRemoveKeyword: (keyword: string) => void;
  onAddPlan: () => void;
  onRemovePlan: (index: number) => void;
  onAddFeature: (planIndex: number) => void;
  onRemoveFeature: (planIndex: number, featureIndex: number) => void;
  onUpdatePlan: (
    index: number,
    field: PlanFieldKey,
    value: PlanFieldValue
  ) => void;
}

export interface CommunityFieldProps {
  control: FormControl;
  error?: string;
}

export interface ModalFormProps {
  form: UseFormReturn<CreateCommunityForm>;
  communityData: TransformedData;
  currentStep: number;
  communityFormHandlers: CommunityFormHandlers;
  navigationHandlers: NavigationHandlers;
}

export interface CommunityFormHandlers {
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  addPlan: () => void;
  removePlan: (index: number) => void;
  addFeatureToPlan: (planIndex: number) => void;
  removeFeatureFromPlan: (planIndex: number, featureIndex: number) => void;
  canAddPlan: () => boolean;
  canRemovePlan: () => boolean;
  updatePlan: (
    index: number,
    field: PlanFieldKey,
    value: PlanFieldValue
  ) => void;
}

export interface NavigationHandlers {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
}

export type PlanFieldValue = boolean | string | number;
export type PlanFieldKey = keyof CreatePlanForm;

export interface CommunityImagesSectionProps {
  banner?: string;
  logo?: string;
  onBannerChange: (value: string) => void;
  onBannerRemove: () => void;
  onLogoChange: (value: string) => void;
  onLogoRemove: () => void;
}

export interface EditCommunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  communityData: EditCommunityData;
  onSave: (data: EditCommunityForm) => Promise<void>;
}
