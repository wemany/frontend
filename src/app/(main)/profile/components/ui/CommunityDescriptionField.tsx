import { FormField } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CommunityFieldProps } from "../../types/community.types";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { DESCRIPTION_LENGTH } from "../../lib/constants/community.constants";

const CommunityDescriptionField = ({ control, error }: CommunityFieldProps) => {
    return (
        <FormField
            control={control}
            name="description"
            render={({ field }) => (
                <FormFieldWrapper label="Descripción" required error={error}>
                    <Textarea
                        minLength={DESCRIPTION_LENGTH.MIN}
                        maxLength={DESCRIPTION_LENGTH.MAX}
                        {...field}
                        placeholder="Describe de qué trata tu comunidad..."
                        className="bg-gray-800/50 border-gray-700 text-white rounded-2xl min-h-[100px]"
                    />
                </FormFieldWrapper>
            )}
        />
    )
}

export default CommunityDescriptionField;
