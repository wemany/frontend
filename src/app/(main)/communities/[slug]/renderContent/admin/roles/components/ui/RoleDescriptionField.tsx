import { FormFieldWrapper } from "@/app/(main)/profile/components/ui/FormFieldWrapper";
import { FormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { RoleFieldProps } from "../../types/role.type";
import { Textarea } from "@/components/ui/textarea";

const RoleDescriptionField = ({ control }: RoleFieldProps) => {
    return (
        <FormField
            control={control}
            name="description"
            render={({ field, fieldState }) => (
                <FormFieldWrapper label="Descripción" required>
                    <Textarea
                        minLength={5}
                        maxLength={200}
                        {...field}
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
export default RoleDescriptionField;