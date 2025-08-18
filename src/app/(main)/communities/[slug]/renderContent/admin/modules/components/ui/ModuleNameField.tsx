import { FormField } from "@/components/ui/form";
import { ModuleFieldProps } from "../../types/module.type";
import { FormFieldWrapper } from "@/app/(main)/profile/components/ui/FormFieldWrapper";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { NAME_LENGTH } from "../../lib/constants/module.constants";

const ModuleNameField = ({ control }: ModuleFieldProps) => {
    return (
        <FormField
            control={control}
            name="name"
            render={({ field, fieldState }) => (
                <FormFieldWrapper label="Nombre del Módulo" required>
                    <Input
                        {...field}
                        minLength={NAME_LENGTH.MIN}
                        maxLength={NAME_LENGTH.MAX}
                        placeholder="Ej: Introducción al curso"
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

export default ModuleNameField;