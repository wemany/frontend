import { FormField } from "@/components/ui/form";
import { PlanFeaturesProps } from "../../types/community.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FEATURES_LENGTH } from "../../lib/constants/community.constants";

const PlanFeatures = ({ control, planIndex, features, onAddFeature, onRemoveFeature }: PlanFeaturesProps) => {
    const canAddMoreFeatures = features.length < FEATURES_LENGTH.MAX;

    return (
        <div>
            <label className="block text-white text-sm font-medium mb-2">Características Incluidas</label>
            <div className="space-y-2">
                {features.map((_, featureIndex) => (
                    <div key={featureIndex} className="flex gap-2">
                        <FormField
                            control={control}
                            name={`plans.${planIndex}.features.${featureIndex}`}
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
                        {features.length > 1 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => onRemoveFeature(featureIndex)}
                                className="text-red-400 hover:text-red-300 rounded-2xl"
                                aria-label={`Eliminar característica ${featureIndex + 1}`}
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
                onClick={onAddFeature}
                className="text-purple-400 hover:text-purple-300 rounded-2xl mt-2"
                disabled={!canAddMoreFeatures}

            >
                <Plus className="mr-2 h-4 w-4" />
                Agregar Característica
            </Button>
            {!canAddMoreFeatures && (
                <p className="text-red-400 text-sm mt-2">
                    Has alcanzado el límite de {FEATURES_LENGTH.MAX} características.
                </p>
            )}
        </div>
    )
}

export default PlanFeatures;