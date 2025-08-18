import { FieldValues } from "react-hook-form";
import { CheckboxFieldProps } from "../types/form";

const CheckboxField = <TFormValues extends FieldValues>({ id, register, errors, children }: CheckboxFieldProps<TFormValues>) => {
    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id={id}
                    {...register(id)}
                    className="w-4 h-4 rounded-full accent-purple-400 focus:ring-purple-500 focus:ring-2"
                />
                {children}
            </div>
            {errors[id] && (
                <p className="text-red-500 text-sm">{errors[id]?.message as React.ReactNode}</p>
            )}
        </div>
    );
};

export default CheckboxField;