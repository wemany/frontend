"use client"

import InfoScreenWrapper from "@/components/InfoScreenWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForgotPasswordForm } from "../forgot-password/hooks/useForgotPasswordForm";

const ForgotPasswordConfirmationPage = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const { handleSubmit, onSubmit, message, submissionStatus } = useForgotPasswordForm();
    const email = searchParams.get("email");

    return (
        <InfoScreenWrapper>
            <div className="flex-1 flex items-center justify-center">
                <Card className="w-xl p-8 bg-gray-900 backdrop-blur-xl rounded-2xl text-center space-y-6 shadow-xl border-none">
                    <CardContent className="flex flex-col items-center">
                        <div className="flex justify-center mb-4">
                            <Image
                                src="/images/ready_icon.png"
                                alt="ready_icon"
                                width={75}
                                height={75}
                            />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Link de Restablecimiento Enviado</h2>
                        {message && submissionStatus === "error" && (
                            <div className="text-red-500 text-sm text-center py-2">
                                {message}
                            </div>
                        )}
                        <Separator className="bg-gray-800 h-px my-2" />
                        <p className="text-gray-300 leading-relaxed text-xl">
                            Hemos enviado un enlace para restablecer la contraseña a{" "}
                            <span className="text-purple-400 font-semibold break-all">{email}</span>. Por favor, sigue las instrucciones en ese correo.
                        </p>
                    </CardContent>
                    <Button onClick={() => router.push("/")} className="`w-lg h-14 px-10 py-2 rounded-2xl text-xl font-semibold bg-purple-400 text-white hover:bg-purple-600 border-none cursor-pointer">
                        Volver al Incio
                    </Button>
                    <label className="text-sm text-gray-400">
                        ¿No recibiste el correo?{" "}
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            className="p-0 text-purple-400 hover:text-purple-600 transition-colors hover:underline"
                        >Enviar de Nuevo</Button>
                    </label>
                </Card>
            </div>
        </InfoScreenWrapper>
    );
}

export default ForgotPasswordConfirmationPage;