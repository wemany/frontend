"use client"

import InputField from "@/app/auth/components/InputField";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";
import ButtonSubmit from "@/components/Buttons/ButtonSubmit";
import { Separator } from "@/components/ui/separator";

export default function ForgotPasswordForm() {
    const { register, handleSubmit, onSubmit, errors, isValid, isSubmitting, message, submissionStatus } = useForgotPasswordForm();
    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-3 gap-3 pb-4 w-full"
            >
                {message && submissionStatus === "error" && (
                    <div className="text-red-500 text-sm text-center py-2">
                        {message}
                    </div>
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
                <Separator className="mt-4 bg-gray-800" />
                <ButtonSubmit
                    isSubmitting={isSubmitting}
                    isValid={isValid}
                    label="Send instructions"
                    labeling="Sending instructions..."
                />
            </form>
        </>
    );
}