import Image from "next/image";
import { InputFieldProps } from "../types/form";
import { FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";

const InputField = <TFormValues extends FieldValues>({
    iconSrc,
    id,
    type,
    isSubmitting,
    placeholder,
    errors,
    register,
}: InputFieldProps<TFormValues>) => {
    return (
        <div className="flex flex-col w-full">
            <div className="relative flex items-center">
                <div className="absolute left-3">
                    <Image src={iconSrc} alt={iconSrc} width={16} height={16} />
                </div>
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    {...register(id)}
                    disabled={isSubmitting}
                    className={`w-full h-12 px-10 rounded-2xl bg-gray-900 text-white outline-none border-0 focus:border-2 focus:border-purple-400 ${errors[id] ? "border-2 border-red-600" : "border-0"}`}
                />
            </div>
            {errors[id] && (
                <p className="text-red-500 text-sm mt-1">
                    {errors[id]?.message as string}
                </p>
            )}
        </div>
    );
};

export default InputField;
