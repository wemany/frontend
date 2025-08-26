'use client';

import { PasswordInputProps } from '@/app/auth/types/form';
import { usePasswordStrength } from '../../hooks/usePasswordStrength';
import { StrengthScore } from './StrengthScore';
import PasswordInput from '@/app/auth/components/PasswordField';
import { FieldValues } from 'react-hook-form';


const PasswordStrength = <TFormValues extends FieldValues>({
    id,
    name,
    placeholder,
    isSubmitting,
    errors,
    register,
    watch
}: PasswordInputProps<TFormValues>) => {

    const passwordValue = watch(name) as string;

    const { strengthScore, metCriteria, getStrengthIndicator, passwordCriteria } = usePasswordStrength(passwordValue)

    return (
        <>
            <PasswordInput
                id={id}
                name={name}
                placeholder={placeholder}
                isSubmitting={isSubmitting}
                errors={errors}
                register={register}
                watch={watch}
            />
            {passwordValue && (
                <StrengthScore
                    strengthScore={strengthScore}
                    metCriteria={metCriteria}
                    passwordCriteria={passwordCriteria}
                    getStrengthIndicator={getStrengthIndicator}
                />
            )}
        </>
    );
};

export default PasswordStrength;