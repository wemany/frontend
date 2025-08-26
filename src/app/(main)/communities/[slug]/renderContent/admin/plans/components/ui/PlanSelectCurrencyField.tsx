import { FormField } from "@/components/ui/form";
import { FormControl } from "../../types/plan.type";
import { FormFieldWrapper } from "@/app/(main)/profile/components/ui/FormFieldWrapper";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Currency } from "@/app/(main)/profile/types/community.types";

interface PlanSelectCurrencyFieldProps {
    control: FormControl;
    data: Currency[];
    isFreePlan: boolean;
}

const PlanSelectCurrencyField = ({ control, data, isFreePlan }: PlanSelectCurrencyFieldProps) => {

    return (
        <FormField
            control={control}
            name="currency"
            render={({ field, fieldState }) => (
                <FormFieldWrapper label="Moneda" error={fieldState.error?.message}>
                    <Select
                        value={field.value}
                        onValueChange={(value) => {
                            field.onChange(value)
                            field.onBlur()
                        }}
                        disabled={isFreePlan}
                    >
                        <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white rounded-2xl">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white max-h-56">
                            {data.map((currency: Currency) => (
                                <SelectItem className="hover:bg-gray-500" key={currency.value} value={currency.value}>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono">{currency.symbol}</span>
                                        <span>{currency.label}</span>
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

export default PlanSelectCurrencyField;