"use client"

import ButtonWithIcon from "@/components/Buttons/ButtonWithIcon";
import { useRoutePush } from "@/hooks/useRoutePush";
import { Fingerprint, LogIn } from "lucide-react";
import Image from "next/image";

const ExploreSection = () => {
    const { pushToRoute } = useRoutePush();

    const handleClick = (targetPath: string) => {
        pushToRoute(targetPath);
    };
    return (
        <section className="relative w-full h-[800px] max-w-7xl mx-auto mt-4 rounded-3xl shadow-md p-8 overflow-hidden bg-purple-950">
            <div className="absolute bg-[#7034a54d] -bottom-40 left-0 h-150 w-150 rounded-full blur-[150px]" />
            <div className="absolute top-1/2 -translate-y-1/3 left-0 h-1/3 w-1/2 z-0">
                <Image src="/images/homePage/section-3/bg-explore-section.svg" alt="bg-explore-section"
                    fill
                    objectFit="contain"
                    objectPosition="right center"
                    priority
                />
            </div>
            <div className="space-y-8 max-w-lg z-10 top-1/4 relative">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        Explora{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            comunidades
                        </span>{" "}
                        que no sabías que{" "}
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            necesitabas.
                        </span>
                    </h1>

                    <p className="text-lg md:text-lg text-gray-300 leading-relaxed max-w-lg">
                        Desde ecommerce, arte digital hasta meditación, memes, tarot, cursos o k-pop. En WeMany encuentras
                        tribus con tu misma frecuencia.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
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
        </section>
    )
}

export default ExploreSection;