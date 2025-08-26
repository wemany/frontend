"use client"

import InfoScreenWrapper from "@/components/InfoScreenWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ResetPasswordConfirmation = () => {
    const router = useRouter()


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
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Password updated successfully
                        </h2>
                        <Separator className="bg-gray-800 h-px my-2" />
                        <p className="text-gray-300 leading-relaxed text-xl">
                            We have successfully updated your password, please log in again.
                        </p>
                    </CardContent>
                    <Button
                        onClick={() => router.push("/auth/login")}
                        className="`w-lg h-14 px-10 py-2 rounded-2xl text-xl font-semibold bg-purple-400 text-white hover:bg-purple-600 border-none cursor-pointer"
                    >
                        Login
                    </Button>
                </Card>
            </div>
        </InfoScreenWrapper>
    );
}

export default ResetPasswordConfirmation;