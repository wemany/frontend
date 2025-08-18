"use client"

import ButtonWithIcon from "@/components/Buttons/ButtonWithIcon";
import SearchInput from "@/components/SearchInput";
import { useRoutePush } from "@/hooks/useRoutePush";
import { LogIn } from "lucide-react";
import SwiperCarousel from "../components/swiper-carousel";

const HeroSection = () => {
    const { pushToRoute } = useRoutePush();

    const handleClick = (targetPath: string) => {
        pushToRoute(targetPath);
    };

    return (
        <section className="bg-gray-900 w-full mt-4 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[url(/images/homePage/section-1/bg-hero-section.svg)] bg-no-repeat bg-contain bg-center"></div>

            <div className="relative z-10 flex flex-col items-center justify-center">
                <h1 className="text-white text-center text-6xl md:text-7xl mt-14 font-bold leading-tight">
                    <span>Communities</span>{" "}
                    <span className="text-purple-400">Reinvented</span>
                </h1>

                <p className="text-white text-center my-10 text-3xl font-semibold max-w-md">
                    Nosotros te conectamos con el lugar al que perteneces.
                </p>

                <ButtonWithIcon
                    size="lg"
                    className="border-y-[1px] h-12 px-3 bg-purple-400 hover:bg-purple-600 border-purple-300 hover:border-purple-500 text-base"
                    label="Registrarme Gratis"
                    icon={LogIn}
                    onClick={() => handleClick("/auth/register")}
                />

                <div className="relative w-full max-w-6xl m-auto my-10">
                    <SwiperCarousel />
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50">
                        <SearchInput />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;