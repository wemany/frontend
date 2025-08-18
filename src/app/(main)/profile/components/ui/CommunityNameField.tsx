import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CommunityFieldProps } from "../../types/community.types";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { TITLE_LENGTH } from "../../lib/constants/community.constants";

const CommunityNameField = ({ control, error }: CommunityFieldProps) => {
    return (
        <FormField
            control={control}
            name="name"
            render={({ field }) => (
                <FormFieldWrapper label="Nombre de la Comunidad" required error={error}>
                    <Input
                        minLength={TITLE_LENGTH.MIN}
                        maxLength={TITLE_LENGTH.MAX}
                        {...field}
                        placeholder="Ej: Academia de Marketing Digital"
                        className="bg-gray-800/50 border-gray-700 text-white rounded-2xl"
                    />
                </FormFieldWrapper>
            )}
        />
    )
}

export default CommunityNameField;