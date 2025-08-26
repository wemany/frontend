import CheckboxField from "@/app/auth/components/CheckboxField";
import { CheckboxFieldProps } from "@/app/auth/types/form";
import { FieldValues } from "react-hook-form";

const CheckboxFieldRemember = <TFormValues extends FieldValues>({ id, register, errors }: CheckboxFieldProps<TFormValues>) => {
    return (
        <CheckboxField
            id={id}
            register={register}
            errors={errors}
        >
            <label
                htmlFor={id}
                className="flex flex-wrap items-center text-gray-400 text-sm cursor-pointer"
            >
                Remember me
            </label>
        </CheckboxField>
    );
};

export default CheckboxFieldRemember;