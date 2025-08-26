import { COMMUNITY_STEPS } from "../lib/constants/community.constants"
import { StepRendererProps } from "../types/community.types"
import { BasicInfoStep } from "./BasicInfoStep"
import KeywordsStep from "./KeywordsStep"
import PricingStep from "./PricingStep"

export function StepRenderer({
  currentStep,
  form,
  canAddPlan,
  canRemovePlan,
  communityData,
  onAddKeyword,
  onRemoveKeyword,
  onAddPlan,
  onRemovePlan,
  onAddBenefit,
  onRemoveBenefit,
  onUpdatePlan
}: StepRendererProps) {
  const stepComponents = {
    [COMMUNITY_STEPS.BASIC_INFO]: () => <BasicInfoStep form={form} communityData={communityData} />,
    [COMMUNITY_STEPS.TAGS]: () => (
      <KeywordsStep form={form} onAddKeyword={onAddKeyword} onRemoveKeyword={onRemoveKeyword} />
    ),
    [COMMUNITY_STEPS.PRICING]: () => (
      <PricingStep
        form={form}
        canAddPlan={canAddPlan}
        canRemovePlan={canRemovePlan}
        communityData={communityData}
        onAddPlan={onAddPlan}
        onRemovePlan={onRemovePlan}
        onAddBenefit={onAddBenefit}
        onRemoveBenefit={onRemoveBenefit}
        onUpdatePlan={onUpdatePlan}
      />
    ),
  }

  const StepComponent = stepComponents[currentStep as keyof typeof stepComponents]
  return StepComponent ? StepComponent() : null
}
