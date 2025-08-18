import { FormField } from "@/components/ui/form"
import { FormFieldWrapper } from "./ui/FormFieldWrapper"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { DURATION_LIMITS, DURATION_UNITS, DURATION_UNITS_VALUES, DURATION_VALUE } from "../lib/constants/community.constants"
import { Input } from "@/components/ui/input"
import { PlanDurationProps } from "../types/community.types"

const PlanDuration = ({ control, planIndex, handlePlanUpdate, plan }: PlanDurationProps) => {
    const currentUnit = plan.duration_unit as keyof typeof DURATION_LIMITS;
    const maxLimit = DURATION_LIMITS[currentUnit]?.max;
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
                <span className="text-white text-sm font-medium">Duración del Plan</span>
                <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">
                    Recurrente automáticamente
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name={`plans.${planIndex}.duration_unit`}
                    render={({ field, fieldState }) => (
                        <FormFieldWrapper label="Unidad de Tiempo" required error={fieldState.error?.message}>
                            <Select
                                value={field.value}
                                onValueChange={(value) => {
                                    field.onChange(value)
                                    handlePlanUpdate("duration_unit", value)
                                    field.onBlur()
                                }}
                            >
                                <SelectTrigger
                                    className={cn(
                                        "bg-gray-800/50 border-gray-700 text-white rounded-2xl",
                                        fieldState.error && fieldState.isTouched && "border-red-500",
                                    )}
                                    onBlur={field.onBlur}
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-56">
                                    {DURATION_UNITS.filter((unit) => unit.value !== "none").map((unit) => (
                                        <SelectItem className="hover:bg-gray-500" key={unit.value} value={unit.value}>
                                            {unit.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormFieldWrapper>
                    )}
                />

                <FormField
                    control={control}
                    name={`plans.${planIndex}.duration_value`}
                    render={({ field, fieldState }) => (
                        <FormFieldWrapper label="Cantidad" required error={fieldState.error?.message}>
                            <Input
                                {...field}
                                type="number"
                                min={DURATION_VALUE.MIN}
                                max={maxLimit}
                                onChange={(e) => {
                                    const value = Number(e.target.value)
                                    field.onChange(value)
                                    handlePlanUpdate("duration_value", value)
                                }}
                                onBlur={field.onBlur}
                                placeholder={DURATION_VALUE.MIN.toString()}
                                className={cn(
                                    "bg-gray-800/50 border-gray-700 text-white rounded-2xl",
                                    fieldState.error && fieldState.isTouched && "border-red-500 focus:border-red-500",
                                )}
                            />
                        </FormFieldWrapper>
                    )}
                />
            </div>

            {plan.duration_unit !== DURATION_UNITS_VALUES[0] && plan.duration_value > 0 && (
                <div className="text-sm text-purple-400 bg-purple-500/10 p-3 rounded-xl border border-purple-500/20">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Plan Recurrente: </span>
                        <span>
                            Se renueva cada {plan.duration_value}{" "}
                            {DURATION_UNITS.find((u) => u.value === plan.duration_unit)?.label.toLowerCase()}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PlanDuration;