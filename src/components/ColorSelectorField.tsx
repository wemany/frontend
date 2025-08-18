import { FormFieldWrapper } from "@/app/(main)/profile/components/ui/FormFieldWrapper";
import { FormField } from "@/components/ui/form";
import { ROLE_COLORS } from "../app/(main)/communities/[slug]/renderContent/admin/roles/lib/constants/role.constants";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";

interface ColorSelectorFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
}

const ColorSelectorField = <T extends FieldValues>({ control, name, label = "Color del Rol" }: ColorSelectorFieldProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div>
                    <FormFieldWrapper label={label} required>
                        <div className="grid grid-cols-6 gap-3">
                            {ROLE_COLORS.map((color) => (
                                <div
                                    key={color.value}
                                    onClick={() => field.onChange(color.value)}
                                    className={cn(
                                        "w-12 h-12 rounded-2xl cursor-pointer border-2 transition-all",
                                        color.class,
                                        field.value === color.value
                                            ? "border-white scale-110"
                                            : "border-transparent hover:scale-105",
                                    )}
                                />
                            ))}
                        </div>
                    </FormFieldWrapper>
                </div>
            )}
        />
    )
}
export default ColorSelectorField;