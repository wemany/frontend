import { cn } from "@/lib/utils"
import { StepIndicatorProps } from "../../types/community.types"

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    return (
        <div className="flex gap-2" role="progressbar" aria-valuenow={currentStep} aria-valuemax={totalSteps}>
            {Array.from({ length: totalSteps }, (_, index) => {
                const step = index + 1
                return (
                    <div
                        key={step}
                        className={cn(
                            "w-2 h-2 rounded-full transition-colors",
                            step === currentStep ? "bg-purple-500" : step < currentStep ? "bg-purple-400" : "bg-gray-600",
                        )}
                        aria-label={`Paso ${step}${step === currentStep ? " (actual)" : step < currentStep ? " (completado)" : ""}`}
                    />
                )
            })}
        </div>
    )
}
