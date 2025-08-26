import { FormField } from "@/components/ui/form";
import { FormControl, PlanFieldKey } from "../../types/plan.type";
import { FormFieldWrapper } from "@/app/(main)/profile/components/ui/FormFieldWrapper";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface PlanPriceFieldProps {
    control: FormControl,
    handlePlanUpdate: (field: PlanFieldKey, value: number) => void
}

const PlanPriceField = ({ control, handlePlanUpdate }: PlanPriceFieldProps) => {
    return (
        <FormField
            control={control}
            name="price"
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
    )
}
export default PlanPriceField;