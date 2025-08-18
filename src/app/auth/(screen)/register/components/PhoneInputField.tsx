"use client"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { type Control, Controller, type FieldErrors, UseFormTrigger } from "react-hook-form"
import { SignupFormValues } from "@/app/auth/lib/schema/signup.schema"

interface PhoneInputFieldProps {
    control: Control<SignupFormValues>
    errors: FieldErrors<SignupFormValues>
    isSubmitting: boolean
    trigger: UseFormTrigger<SignupFormValues>;
}

const PhoneInputField = ({ control, errors, isSubmitting, trigger }: PhoneInputFieldProps) => {
    return (
        <div className="flex flex-col w-full">
            <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <div className="relative flex items-center">
                        <PhoneInput
                            international
                            defaultCountry="CO"
                            value={value}
                            onChange={onChange}
                            onBlur={() => { trigger("phone") }}
                            disabled={isSubmitting}
                            placeholder="3214567890"
                            className={`w-full h-12 px-3 rounded-2xl bg-gray-900 text-white focus-within:border-2 focus-within:border-purple-400 ${errors.phone ? "border-2 border-red-600" : "border-0"}`}

                        />
                    </div>
                )}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
    )
}

export default PhoneInputField;