import { FormField } from "@/components/ui/form";
import { PlanFieldProps } from "../../types/plan.type";
import { FormFieldWrapper } from "@/app/(main)/profile/components/ui/FormFieldWrapper";
import { Input } from "@/components/ui/input";
import { TITLE_LENGTH } from "@/app/(main)/profile/lib/constants/community.constants";
import { cn } from "@/lib/utils";

const PlanNameField = ({ control }: PlanFieldProps) => {
    return (
        <FormField
            control={control}
            name="name"
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
    )
}
export default PlanNameField;