import { FormField } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { FormFieldWrapper } from "@/app/(main)/profile/components/ui/FormFieldWrapper";
import { ModuleFieldProps } from "../../types/module.type";

const ModuleVisibleField = ({ control }: ModuleFieldProps) => {
    return (
        <FormField
            control={control}
            name="is_active"
            render={({ field }) => (
                <FormFieldWrapper>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-800/30">
                        <div>
                            <p className="text-white font-medium">Módulo Visible</p>
                            <p className="text-slate-400 text-sm">Los estudiantes pueden ver este módulo</p>
                        </div>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="h-8 w-14 p-0 data-[state=checked]:bg-purple-600 data-[state=unchecked]:bg-gray-600 [&>span]:h-7 [&>span]:w-7 [&>span]:bg-white data-[state=checked]:[&>span]:translate-x-[28px] "
                        />
                    </div>
                </FormFieldWrapper>
            )}
        />
    )
}

export default ModuleVisibleField;