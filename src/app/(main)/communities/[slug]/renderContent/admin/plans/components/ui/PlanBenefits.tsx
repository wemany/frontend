import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlanBenefitsProps } from "../../types/plan.type";
import { BENEFITS_LENGTH } from "@/app/(main)/profile/lib/constants/community.constants";

const PlanBenefits = ({ control, benefits, onAddBenefit, onRemoveBenefit }: PlanBenefitsProps) => {
    const canAddMoreBenefits = benefits.length < BENEFITS_LENGTH.MAX;

    return (
        <div>
            <label className="block text-white text-sm font-medium mb-2">Características Incluidas</label>
            <div className="space-y-2">
                {benefits.map((_, benefitIndex) => (
                    <div key={benefitIndex} className="flex gap-2">
                        <FormField
                            control={control}
                            name={`benefits.${benefitIndex}`}
                            render={({ field, fieldState }) => (
                                <Input
                                    {...field}
                                    placeholder="Ej: Acceso a todos los módulos"
                                    className={cn(
                                        "bg-gray-800/50 border-gray-700 text-white rounded-xl flex-1 transition-colors",
                                        fieldState.error && fieldState.isTouched && "border-red-500 focus:border-red-500",
                                    )}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                        {benefits.length > 1 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => onRemoveBenefit(benefitIndex)}
                                className="text-red-400 hover:text-red-300 rounded-2xl"
                                aria-label={`Eliminar característica ${benefitIndex + 1}`}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ))}
            </div>

            <Button
                type="button"
                variant="ghost"
                onClick={onAddBenefit}
                className="text-purple-400 hover:text-purple-300 rounded-2xl mt-2"
                disabled={!canAddMoreBenefits}

            >
                <Plus className="mr-2 h-4 w-4" />
                Agregar Característica
            </Button>
            {!canAddMoreBenefits && (
                <p className="text-red-400 text-sm mt-2">
                    Has alcanzado el límite de {BENEFITS_LENGTH.MAX} características.
                </p>
            )}
        </div>
    )
}

export default PlanBenefits;