"use client"

import ButtonSocialLogin from "@/components/Buttons/ButtonSocialLogin";
import { signIn } from "next-auth/react"

export function SocialLoginButtons({ isSubmitting }: { isSubmitting: boolean }) {
    return (
        <div className="flex w-30 justify-center gap-3">
            <ButtonSocialLogin
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                iconSrc="/icons/google.svg"
                isSubmitting={isSubmitting}
                label="Google"
            />

            {/* <ButtonSocialLogin
                onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
                iconSrc="/icons/facebook.svg"
                isSubmitting={isSubmitting}
                label="Facebook"
            />

            <ButtonSocialLogin
                onClick={() => signIn("twitter", { callbackUrl: "/dashboard" })}
                iconSrc="/icons/twitter.svg"
                isSubmitting={isSubmitting}
                label="Twitter"
            />

            <ButtonSocialLogin
                onClick={() => signIn("apple", { callbackUrl: "/dashboard" })}
                iconSrc="/icons/apple.svg"
                isSubmitting={isSubmitting}
                label="Apple"
            /> */}
        </div>
    );
}