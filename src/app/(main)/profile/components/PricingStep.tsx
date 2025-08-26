"use client"

import { PricingStepProps } from "../types/community.types"
import AddPlanButton from "./ui/AddPlanButton"
import PlanCard from "./PlanCard"
import { PLAN_LIMITS } from "../lib/constants/community.constants"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"

const PricingStep = ({ form, communityData, canAddPlan, canRemovePlan, onAddPlan, onRemovePlan, onAddBenefit, onRemoveBenefit, onUpdatePlan }: PricingStepProps) => {
    const { watch } = form
    const plans = watch("plans")

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-white font-medium text-lg mb-2">Planes de Suscripción</h3>
                <p className="text-slate-400 text-sm mb-4">
                    Configura los planes de acceso a tu comunidad (máximo {PLAN_LIMITS.MAX_PLANS} planes)
                </p>

                <Alert className="bg-yellow-300 text-black/70">
                    <AlertCircleIcon />
                    <AlertTitle className="font-bold text-lg">Recuerda:</AlertTitle>
                    <AlertDescription className="font-semibold">
                        Si en el futuro archivas este plan, tus miembros actuales seguirán activos y pagando, pero no se permitirán nuevos registros.
                    </AlertDescription>
                </Alert>
            </div>

            <div className="space-y-4">
                {plans.map((plan, index) => (
                    <PlanCard
                        key={index}
                        plan={plan}
                        planIndex={index}
                        form={form}
                        communityData={communityData}
                        canRemove={canRemovePlan}
                        onRemove={() => onRemovePlan(index)}
                        onAddBenefit={() => onAddBenefit(index)}
                        onRemoveBenefit={(benefitIndex) => onRemoveBenefit(index, benefitIndex)}
                        onUpdatePlan={onUpdatePlan}
                    />
                ))}
            </div>

            <AddPlanButton
                onAdd={onAddPlan}
                canAdd={canAddPlan}
                currentPlansCount={plans.length}
                maxPlans={PLAN_LIMITS.MAX_PLANS}
            />
        </div>
    )
}

export default PricingStep;