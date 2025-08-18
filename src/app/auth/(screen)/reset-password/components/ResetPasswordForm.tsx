"use client"

import ButtonSubmit from "@/components/Buttons/ButtonSubmit"
import ConfirmPassword from "../../register/components/passwordField/ConfirmPassword"
import PasswordStrength from "../../register/components/passwordField/PasswordStrength"
import { useResetPassword } from "../hooks/useResetPassword"

export default function ResetPasswordForm() {

    const { register, handleSubmit, onSubmit, watch, errors, isValid, isSubmitting } = useResetPassword()

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 pb-4 w-full"
        >
            <PasswordStrength
                id="password"
                name="password"
                placeholder="Enter your new password"
                isSubmitting={isSubmitting}
                register={register}
                errors={errors}
                watch={watch}
            />
            <div className='pt-6'>
                <ConfirmPassword
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your new password"
                    isSubmitting={isSubmitting}
                    register={register}
                    errors={errors}
                    watch={watch}
                />
            </div>
            <hr className="border-t border-[#FFFFFF08] w-full" />
            <ButtonSubmit
                isValid={isValid}
                isSubmitting={isSubmitting}
                label="Save Password"
                labeling="Saving Password"

            />
            { }
        </form>
    )
}