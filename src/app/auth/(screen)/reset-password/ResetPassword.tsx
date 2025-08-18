import InfoScreenWrapper from "@/components/InfoScreenWrapper";
import Image from "next/image";
import ResetPasswordForm from "./components/ResetPasswordForm";

const ResetPasswordPage = () => {
    return (
        <InfoScreenWrapper>
            <div className=" flex items-center justify-center w-full">
                <div className="rounded-xl flex flex-col justify-center w-[60%] xl:w-[40%] mx-2 max-w-6xl overflow-hidden p-4 sm:p-8">

                    <div className="bg-gray-900 flex flex-col items-center gap-5 py-5 rounded-xl shadow-[0px_0px_5px_3px_#f7fafc] shadow-[#FFFFFF08]">
                        <div>
                            <Image
                                src="/images/forgot-password_icon.png"
                                alt="forgot-password_icon"
                                width={75}
                                height={75}
                            />
                        </div>
                        <h2 className="text-3xl font-semibold text-gray-200">
                            Restablecer Password
                        </h2>
                        <hr className="border-t border-[#FFFFFF08] w-full" />
                        <p className="max-w-[80%]">
                            Asegúrate de crear una contraseña segura y fácil de recordar. Tu contraseña actual no debe ser similar a la anterior.
                        </p>
                        <div className="flex flex-col items-center w-[80%]">
                            <ResetPasswordForm />
                        </div>
                    </div>
                </div>

                <div className="relative hidden xl:block lg:w-[40%] h-[780px]">
                    <Image
                        src="/images/reset-password.png"
                        alt="reset-password"
                        fill
                        className="rounded-xl object-fill"
                        sizes="(max-width: 1024px) 0vw, 50vw"
                    />
                    <div className="absolute bottom-4 w-full p-4 text-white z-10">
                    </div>
                </div>
            </div>
        </InfoScreenWrapper>
    )
}

export default ResetPasswordPage;