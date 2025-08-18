import Link from "next/link";
import { CheckboxFieldProps } from "../../../types/form";
import CheckboxField from "../../../components/CheckboxField";
import { FieldValues } from "react-hook-form";

const CheckboxFieldTerms = <TFormValues extends FieldValues>({ id, register, errors }: CheckboxFieldProps<TFormValues>) => {
    return (
        <CheckboxField
            id={id}
            register={register}
            errors={errors}
        >
            <p className="text-sm text-gray-400">
                I have read and accept the{" "}
                <Link href="/terms"
                    className="text-purple-400 hover:text-purple-600 transition-colors"
                >Terms & Conditions.</Link>
            </p>
        </CheckboxField>
    );
};

export default CheckboxFieldTerms;