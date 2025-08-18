import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PlanBasicFieldsProps, Currency } from "../../types/community.types";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { DESCRIPTION_LENGTH, TITLE_LENGTH } from "../../lib/constants/community.constants";
import ColorSelectorField from "@/components/ColorSelectorField";

const PlanBasicFields = ({ control, planIndex, currencies, isFreePlan, handlePlanUpdate }: PlanBasicFieldsProps) => {
    return (
        <div className="grid grid-cols-1 gap-4 mb-4">
            {/* Input Name */}
            <FormField
                control={control}
                name={`plans.${planIndex}.name`}
                render={({ field, fieldState }) => (
                    <FormFieldWrapper label="Nombre del Plan" required error={fieldState.error?.message}>
                        <Input
                            {...field}
                            minLength={TITLE_LENGTH.MIN}
                            maxLength={TITLE_LENGTH.MAX}
                            placeholder="Ej: Básico, VIP, Premium"
                            className={cn(
                                "bg-gray-800/50 border-gray-700 text-white rounded-2xl transition-colors",
                                fieldState.error && fieldState.isTouched && "text-xs border-red-500 focus:border-red-500",
                            )}
                            onBlur={field.onChange}
                        />
                    </FormFieldWrapper>
                )}
            />

            {/* Input Description */}
            <FormField
                control={control}
                name={`plans.${planIndex}.description`}
                render={({ field, fieldState }) => (
                    <FormFieldWrapper label="Descriptión del Plan" required error={fieldState.error?.message}>
                        <Textarea
                            {...field}
                            minLength={DESCRIPTION_LENGTH.MIN}
                            maxLength={DESCRIPTION_LENGTH.MAX}
                            placeholder="Describe qué incluye este plan..."
                            className={cn(
                                "bg-gray-800/50 border-gray-700 text-white rounded-2xl transition-colors",
                                fieldState.error && fieldState.isTouched && "text-xs border-red-500 focus:border-red-500",
                            )}
                            onBlur={field.onChange}
                        />
                    </FormFieldWrapper>
                )}
            />

            <ColorSelectorField
                control={control}
                name={`plans.${planIndex}.color`}
                label="Color del Plan"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input Price */}
                <FormField
                    control={control}
                    name={`plans.${planIndex}.price`}
                    render={({ field, fieldState }) => (
                        <FormFieldWrapper
                            label="Precio"
                            error={fieldState.error?.message}
                        >
                            <Input
                                {...field}
                                type="number"
                                min="0"
                                step="0.01"
                                onChange={(e) => {
                                    const value = Number(e.target.value)
                                    field.onChange(value)
                                    handlePlanUpdate("price", value)
                                }}
                                onBlur={field.onBlur}
                                placeholder="0"
                                className={cn(
                                    "bg-gray-800/50 border-gray-700 text-white rounded-2xl",
                                    fieldState.error && fieldState.isTouched && "border-red-500 focus:border-red-500",
                                )}
                            />
                        </FormFieldWrapper>
                    )}
                />

                {/* Select Currency */}
                <FormField
                    control={control}
                    name={`plans.${planIndex}.currency`}
                    render={({ field, fieldState }) => (
                        <FormFieldWrapper label="Moneda" error={fieldState.error?.message}>
                            <Select
                                value={field.value}
                                onValueChange={(value) => {
                                    field.onChange(value)
                                    field.onBlur()
                                }}
                                disabled={isFreePlan}
                            >
                                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white rounded-2xl">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-56">
                                    {currencies.map((currency: Currency) => (
                                        <SelectItem className="hover:bg-gray-500" key={currency.value} value={currency.value}>
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono">{currency.symbol}</span>
                                                <span>{currency.label}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormFieldWrapper>
                    )}
                />
            </div>
        </div>
    )
}

export default PlanBasicFields;