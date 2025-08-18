'use client';

import PasswordInput from '@/app/auth/components/PasswordField';
import { PasswordInputProps } from '@/app/auth/types/form';
import { FieldValues } from 'react-hook-form';


const ConfirmPassword = <TFormValues extends FieldValues>({
    id,
    name,
    placeholder,
    isSubmitting,
    errors,
    register,
    watch
}: PasswordInputProps<TFormValues>) => {
    return (
        <div className="flex flex-col gap-1">
            <PasswordInput
                id={id}
                name={name}
                placeholder={placeholder}
                isSubmitting={isSubmitting}
                errors={errors}
                register={register}
                watch={watch}
            />

            {errors[id] && (
                <p className="text-red-500 text-sm">
                    {errors[id]?.message as string}
                </p>
            )}
        </div>
    );
};

export default ConfirmPassword;