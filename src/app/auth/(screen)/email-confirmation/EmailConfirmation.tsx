"use client"

import InfoScreenWrapper from "@/components/InfoScreenWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const EmailConfirmationPage = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const email = searchParams.get("email");

    return (
        <InfoScreenWrapper>
            <div className="flex-1 flex items-center justify-center">
                <Card className="w-xl p-8 bg-gray-900 backdrop-blur-xl rounded-2xl text-center space-y-6 shadow-xl border-none">
                    <CardContent className="flex flex-col items-center">
                        <div className="flex justify-center mb-4">
                            <Image
                                src="/images/message_icon.png"
                                alt="message_icon"
                                width={75}
                                height={75}
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Email de Confirmación Enviado</h2>
                        <Separator className="bg-gray-800 h-px my-2" />
                        <p className="text-gray-300 leading-relaxed text-base">
                            Se ha enviado un enlace de verificación a{" "}
                            <span className="text-purple-400 font-semibold break-all">{email}</span>. Por favor, haz clic en el enlace
                            para completar el proceso de verificación.
                        </p>
                    </CardContent>
                    <Button onClick={() => router.push("/")} className="bg-purple-400 h-12 text-lg text-white hover:bg-purple-600 rounded-lg border-none cursor-pointer">
                        Cerrar
                    </Button>
                </Card>
            </div>
        </InfoScreenWrapper>
    );
}

export default EmailConfirmationPage;