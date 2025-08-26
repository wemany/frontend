"use client"

import { useSignUpForm } from "../hooks/useSignUpForm";
import InputField from "../../../components/InputField";
import { SocialLoginButtons } from "../../../components/SocialLoginButtons";
import ConfirmPassword from "./passwordField/ConfirmPassword";
import PasswordStrength from "./passwordField/PasswordStrength";
import CheckboxFieldTerms from "./CheckboxFieldTerms";
import ButtonSubmit from "@/components/Buttons/ButtonSubmit";
import PhoneInputField from "./PhoneInputField";

const SignUpForm = () => {

    const { register, handleSubmit, onSubmit, watch, trigger, errors, control, isSubmitting, isValid, message, submissionStatus } =
        useSignUpForm()
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-3 pb-4 w-full"
            >
                {message && submissionStatus === "error" && (
                    <div className="text-red-500 text-sm text-center py-2">{message}</div>
                )}
                <InputField
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    iconSrc="/icons/user.svg"
                    isSubmitting={isSubmitting}
                    errors={errors}
                    register={register}
                />
                <InputField
                    id="email"
                    type="email"
                    placeholder="email@wemany.com"
                    iconSrc="/icons/email.svg"
                    isSubmitting={isSubmitting}
                    errors={errors}
                    register={register}
                />
                <PhoneInputField
                    isSubmitting={isSubmitting}
                    errors={errors}
                    trigger={trigger}
                    control={control}
                />
                <PasswordStrength
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    isSubmitting={isSubmitting}
                    errors={errors}
                    register={register}
                    watch={watch}
                />
                <ConfirmPassword
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    isSubmitting={isSubmitting}
                    errors={errors}
                    register={register}
                    watch={watch}
                />
                <CheckboxFieldTerms
                    id="termsAccepted"
                    errors={errors}
                    register={register}
                />

                <ButtonSubmit
                    isValid={isValid}
                    isSubmitting={isSubmitting}
                    label="Register"
                    labeling="Registering"
                />
            </form>
            <div className="flex flex-col gap-6">
                <div className="text-center text-gray-400 text-sm">
                    Or log in with
                </div>
                <SocialLoginButtons isSubmitting={isSubmitting} />
            </div>
        </>
    );
}

export default SignUpForm;