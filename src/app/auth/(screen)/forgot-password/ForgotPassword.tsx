import InfoScreenWrapper from "@/components/InfoScreenWrapper";
import Image from "next/image";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { Separator } from "@/components/ui/separator";

const ForgotPasswordPage = () => {
    return (
        <InfoScreenWrapper>
            <div className=" flex items-center justify-center">
                <div className="rounded-xl flex flex-col justify-center w-auto mx-2 max-w-6xl overflow-hidden p-4 sm:p-8">

                    <div className="bg-gray-950 flex flex-col items-center gap-5 w-full py-5 px-7 rounded-xl shadow-[0px_0px_5px_3px_#f7fafc] shadow-[#FFFFFF08]">
                        <div>
                            <Image
                                src="/images/forgot-password_icon.png"
                                alt="forgot-password_icon"
                                width={75}
                                height={75}
                            />
                        </div>
                        <h2 className="text-3xl font-semibold text-gray-200">
                            ¿Olvidaste tu contraseña?
                        </h2>
                        <Separator className="mt-4 bg-gray-800" />
                        <p>
                            No te preocupes, solo ingresa el correo electrónico registrado en tu cuenta de WeMany y te enviaremos un enlace para restablecer tu contraseña.
                        </p>
                        <ForgotPasswordForm />
                    </div>
                </div>

                <div className="relative hidden xl:block lg:w-full lg:h-[760px]">
                    <Image
                        src="/images/forgot-password.png"
                        alt="forgot-password"
                        fill
                        className="rounded-xl object-cover"
                    />
                    <div className="absolute bottom-4 w-full p-4 text-white z-10">
                    </div>
                </div>
            </div>
        </InfoScreenWrapper>
    )
}

export default ForgotPasswordPage;