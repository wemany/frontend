import { FormControl, FormField } from "@/components/ui/form";
import { ModuleFieldProps } from "../../types/module.type";
import ImageUpload from "@/app/(main)/profile/components/ImageUpload";

const ModuleBannerField = ({ control }: ModuleFieldProps) => {
    return (
        <FormField
            control={control}
            name="banner"
            render={({ field, fieldState }) => (
                <div className="space-y-1">
                    <FormControl>
                        <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                            onRemove={() => field.onChange("")}
                            label="Banner del Módulo"
                            description="Sube una imagen para el banner del módulo. La proporción recomendada es 3:1."
                            aspectRatio="banner"
                            maxSize={5}
                            error={fieldState.error?.message}
                        />
                    </FormControl>
                </div>
            )}
        />
    )
}

export default ModuleBannerField;