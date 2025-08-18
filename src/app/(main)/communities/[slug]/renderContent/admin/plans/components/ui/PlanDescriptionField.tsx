import { FormField } from "@/components/ui/form";
import { PlanFieldProps } from "../../types/plan.type";
import { FormFieldWrapper } from "@/app/(main)/profile/components/ui/FormFieldWrapper";
import { DESCRIPTION_LENGTH } from "@/app/(main)/profile/lib/constants/community.constants";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const PlanDescriptionField = ({ control }: PlanFieldProps) => {
    return (
        <FormField
            control={control}
            name="description"
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
    )
}
export default PlanDescriptionField;