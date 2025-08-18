import { FormFieldWrapper } from "@/app/(main)/profile/components/ui/FormFieldWrapper";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RoleFieldProps } from "../../types/role.type";

const RoleNameField = ({ control }: RoleFieldProps) => {
    return (
        <FormField
            control={control}
            name="name"
            render={({ field, fieldState }) => (
                <FormFieldWrapper label="Nombre del Rol" required>
                    <Input
                        {...field}
                        minLength={2}
                        maxLength={30}
                        placeholder="Ej: Moderador, VIP, Colaborador"
                        className={cn(
                            "bg-gray-800/50 border-gray-700 text-white rounded-xl",
                            fieldState.error && "border-red-500",
                        )}
                    />
                </FormFieldWrapper>
            )}
        />
    )
}
export default RoleNameField;