import { FormFieldWrapper } from "@/app/(main)/profile/components/ui/FormFieldWrapper";
import { FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { ModuleFieldProps } from "../../types/module.type";
import { DESCRIPTION_LENGTH } from "../../lib/constants/module.constants";

const ModuleDescriptionField = ({ control }: ModuleFieldProps) => {
    return (
        <FormField
            control={control}
            name="description"
            render={({ field, fieldState }) => (
                <FormFieldWrapper label="Descripción" required>
                    <Textarea
                        {...field}
                        minLength={DESCRIPTION_LENGTH.MIN}
                        maxLength={DESCRIPTION_LENGTH.MAX}
                        placeholder="Describe las responsabilidades y beneficios de este rol"
                        className={cn(
                            "bg-gray-800/50 border-gray-700 text-white rounded-xl min-h-[80px]",
                            fieldState.error && "border-red-500",
                        )}
                    />
                </FormFieldWrapper>
            )}
        />
    )
}
export default ModuleDescriptionField;