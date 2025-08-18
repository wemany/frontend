import { FormField } from "@/components/ui/form"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Category, CommunityFieldProps } from "../../types/community.types"
import { FormFieldWrapper } from "./FormFieldWrapper"

const CommunityCategoryField = ({ control, error, categories }: CommunityFieldProps & { error?: string; categories: Category[] }) => {
    return (
        <FormField
            control={control}
            name="category"
            render={({ field }) => (
                <FormFieldWrapper label="Categoría" required error={error}>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white rounded-2xl">
                            <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-56">
                            {categories.map((category: Category) => (
                                <SelectItem className="hover:bg-gray-500" key={category.id} value={category.value}>
                                    <div className="flex items-center gap-2">

                                        <span>{category.label}</span>
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

export default CommunityCategoryField