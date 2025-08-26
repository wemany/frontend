import { FormField } from "@/components/ui/form";
import { RoleFieldProps } from "../../types/role.type";
import { FormFieldWrapper } from "@/app/(main)/profile/components/ui/FormFieldWrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ROLE_ICONS } from "../../lib/constants/role.constants";

const RoleIconField = ({ control }: RoleFieldProps) => {
    return (
        <FormField
            control={control}
            name="icon"
            render={({ field }) => (
                <FormFieldWrapper label="Icono" required>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white rounded-xl">
                            <SelectValue placeholder="Selecciona un icono" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                            {ROLE_ICONS.map((icon) => {
                                const IconComponent = icon.icon
                                return (
                                    <SelectItem key={icon.value} value={icon.value}>
                                        <div className="flex items-center gap-2">
                                            <IconComponent className="h-4 w-4 text-slate-400" />
                                            <span className="text-white">{icon.label}</span>
                                        </div>
                                    </SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                </FormFieldWrapper>
            )}
        />
    )
}

export default RoleIconField;