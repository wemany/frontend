import { BaseOptionProps, PlanCardProps, PlanFieldKey } from "../types/community.types"
import PlanBasicFields from "./ui/PlanBasicFields"
import PlanCardHeader from "./ui/PlanCardHeader"
import PlanBenefits from "./ui/PlanBenefits"
import PlanDuration from "./PlanDuration"
import { CreditCard, Repeat } from "lucide-react"
import TypeSelector from "./ui/TypeSelector"

const planTypeOptions: Omit<BaseOptionProps<boolean>, "isSelected" | "onSelect">[] = [
    {
        type: false,
        icon: <CreditCard className="h-5 w-5 text-blue-400" />,
        title: "Pago único",
        description: "El usuario paga una sola vez y obtiene acceso permanente",
    },
    {
        type: true,
        icon: <Repeat className="h-5 w-5 text-purple-400" />,
        title: "Pago recurrente",
        description: "El usuario paga periódicamente según la duración configurada",
    },
];

const PlanCard = ({ planIndex, form, canRemove, communityData, onRemove, onAddBenefit, onRemoveBenefit, onUpdatePlan }: PlanCardProps) => {
    const { control, watch, formState } = form
    const plan = watch(`plans.${planIndex}`)
    const isFreePlan = plan.price === 0
    const isPaidPlan = plan.price > 0


    const handleIsRecurringChange = (isRecurring: boolean) => {
        onUpdatePlan(planIndex, "is_recurring", isRecurring);
    };

    const handlePlanFieldUpdate = (field: PlanFieldKey, value: boolean | string | number) => {
        onUpdatePlan(planIndex, field, value);
    };

    const isRecurringError = formState.errors.plans?.[planIndex]?.is_recurring?.message;

    return (
        <div className="flex flex-col gap-4 p-4 rounded-2xl bg-gray-800/30 border border-gray-700">
            <PlanCardHeader planIndex={planIndex} canRemove={canRemove} onRemove={onRemove} />

            <PlanBasicFields
                control={control}
                planIndex={planIndex}
                isFreePlan={isFreePlan}
                handlePlanUpdate={handlePlanFieldUpdate}
                currencies={communityData.currencies} />

            {isFreePlan && (
                <div className="text-sm text-green-400 bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Plan Gratuito: </span>
                        <span>Acceso permanente sin costo ni renovaciones</span>
                    </div>
                </div>
            )}

            {isPaidPlan &&
                <TypeSelector
                    selectedType={plan.is_recurring}
                    onTypeChange={handleIsRecurringChange}
                    error={isRecurringError}
                    label="Tipo de Pago"
                    options={planTypeOptions}
                />}

            {isPaidPlan && plan.is_recurring &&
                <PlanDuration
                    control={control}
                    planIndex={planIndex}
                    plan={plan}
                    handlePlanUpdate={handlePlanFieldUpdate}
                />}

            <PlanBenefits
                control={control}
                planIndex={planIndex}
                benefits={plan.benefits}
                onAddBenefit={() => onAddBenefit(planIndex)}
                onRemoveBenefit={(benefitIndex) => onRemoveBenefit(planIndex, benefitIndex)}
            />
        </div>
    )
}

export default PlanCard;