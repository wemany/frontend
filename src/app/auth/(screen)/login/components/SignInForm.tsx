"use client"

import InputField from "@/app/auth/components/InputField";
import PasswordInput from "@/app/auth/components/PasswordField";
import { SocialLoginButtons } from "@/app/auth/components/SocialLoginButtons";
import Link from "next/link";
import { useSignInForm } from "../hooks/useSignInForm";
import ButtonSubmit from "@/components/Buttons/ButtonSubmit";

export default function SignInForm() {

    const { register, handleSubmit, onSubmit, watch, errors, isSubmitting, isValid, message, submissionStatus } =
        useSignInForm()
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
                    id="email"
                    type="email"
                    placeholder="email@wemany.com"
                    iconSrc="/icons/email.svg"
                    isSubmitting={isSubmitting}
                    register={register}
                    errors={errors}
                />
                <PasswordInput
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    isSubmitting={isSubmitting}
                    register={register}
                    errors={errors}
                    watch={watch}
                />
                <div className="flex items-end w-full justify-end">
                    {/* <CheckboxFieldRemember
                        id="remember"
                        register={register}
                        errors={errors}
                    /> */}
                    <Link
                        href="/auth/forgot-password"
                        className="text-sm text-purple-400 hover:underline cursor-pointer"
                    >
                        Forgot your password?
                    </Link>
                </div>
                <ButtonSubmit
                    isValid={isValid}
                    isSubmitting={isSubmitting}
                    label="Login"
                    labeling="Logging in"
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