import { FormField } from "@/components/ui/form";
import { CommunityFieldProps, Language } from "../../types/community.types";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CommunityLanguageField = ({ control, error, languages }: CommunityFieldProps & { error?: string; languages: Language[] }) => {
    return (
        <FormField
            control={control}
            name="language"
            render={({ field }) => (
                <FormFieldWrapper label="Idioma Principal" required error={error}>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white rounded-2xl">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            {languages.map((language: Language) => (
                                <SelectItem className="hover:bg-gray-500" key={language.value} value={language.value}>
                                    <div className="flex items-center gap-2">
                                        <span>{language.flag}</span>
                                        <span>{language.label}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormFieldWrapper>
            )}
        />
    )
}

export default CommunityLanguageField;