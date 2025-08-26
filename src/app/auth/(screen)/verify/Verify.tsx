"use client"

import { useVerifyAccount } from "./hooks/useVerifyAccount";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InfoScreenWrapper from "@/components/InfoScreenWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";


const VerifyAccountPage = () => {

    const { isLoading, message, handleRedirect } = useVerifyAccount()

    return (
        <InfoScreenWrapper>
            <div className="flex-1 flex items-center justify-center">
                <Card className="w-xl p-8 bg-gray-900 backdrop-blur-xl rounded-2xl text-center space-y-6 shadow-xl border-none">
                    <CardContent className="flex flex-col items-center">
                        <div className="flex justify-center mb-4">
                            <Image
                                src="/images/feature_icon.png"
                                alt="feature_icon"
                                width={75}
                                height={75}
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Verificación de cuenta
                        </h2>
                        <Separator className="bg-gray-800 h-px my-2" />
                        {isLoading ? (
                            <p className="text-gray-300 leading-relaxed text-base">
                                Verificando Cuenta...
                            </p>
                        ) : (
                            <p className="text-white text-xl">{message}</p>
                        )}
                    </CardContent>
                    <Button onClick={handleRedirect} className={`${isLoading ? "opacity-50 cursor-not-allowed" : "bg-purple-400 text-white hover:bg-purple-600 rounded-lg border-none cursor-pointer"}`}>
                        Cerrar
                    </Button>
                </Card>
            </div>
        </InfoScreenWrapper>
    );
}

export default VerifyAccountPage;