"use client"

import ButtonWithIcon from "@/components/Buttons/ButtonWithIcon";
import ImageStack from "../components/ImageStack";
import Image from "next/image";
import { useRoutePush } from "@/hooks/useRoutePush";
import { Fingerprint, LogIn } from "lucide-react";

const DescriptionSection = () => {
    const { pushToRoute } = useRoutePush();

    const handleClick = (targetPath: string) => {
        pushToRoute(targetPath);
    };
    return (
        <section className="relative w-full max-w-7xl mx-auto mt-4 rounded-3xl shadow-md p-8 overflow-hidden">
            <div className="absolute top-1/2 -translate-y-1/2 -right-80 h-4/5 w-1/2 z-0">
                <Image
                    src="/images/homePage/section-2/bg-description-section.svg"
                    alt="bg-description-section"
                    fill
                    objectFit="contain"
                    objectPosition="right center"
                    priority
                />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-around p-4">
                <div className="flex-shrink-0">
                    <ImageStack />
                </div>

                <div className="flex flex-col gap-y-5 max-w-3xs items-center md:items-start text-white text-center md:text-left">
                    <Image
                        src="/images/homePage/section-2/logo-text-color.png"
                        alt="bg-description-section"
                        width={250}
                        height={80}
                        priority
                    />
                    <p className="text-sm">
                        WeMany es la plataforma para quienes no solo quieren seguir
                        contenido, sino pertenecer. Aquí no eres un espectador, eres parte del movimiento.
                    </p>
                    <div className="flex space-x-2">
                        <ButtonWithIcon
                            size="lg"
                            className="bg-gray-900 px-4 py-1"
                            label="LogUp"
                            icon={Fingerprint}
                            onClick={() => handleClick("/auth/register")}
                        />
                        <ButtonWithIcon
                            size="lg"
                            className="bg-purple-400 hover:bg-purple-600 px-4 py-1"
                            label="LogIn"
                            icon={LogIn}
                            onClick={() => handleClick("/auth/login")}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DescriptionSection;