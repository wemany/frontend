"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

// Importa Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

// Importa los módulos de Swiper que necesitas
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { useRouter } from "next/navigation";

interface BannerSlide {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    background: string;
    image?: string;
    onClick?: () => void;
}


const WelcomeSection = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    const router = useRouter();


    const bannerSlides: BannerSlide[] = [
        {
            id: 1,
            title: "🚀 Nuevas Funcionalidades",
            subtitle: "Descubre las últimas actualizaciones de Wemany",
            description: "Chat en vivo, eventos exclusivos y mucho más",
            cta: "Ver Novedades",
            background: "from-purple-600 to-blue-600",
        },
        {
            id: 2,
            title: "🎯 Crea tu Comunidad",
            subtitle: "Monetiza tu conocimiento y construye tu audiencia",
            description: "Herramientas profesionales para creadores",
            cta: "Crear Comunidad",
            background: "from-green-500 to-emerald-600",
            onClick: () => {
                router.push('/profile?openCreateModal=true');
            }
        },
        {
            id: 3,
            title: "📅 Eventos Exclusivos",
            subtitle: "Masterclasses y workshops con expertos",
            description: "Accede a contenido premium de todas las comunidades",
            cta: "Ver Eventos",
            background: "from-yellow-500 to-orange-600",
        },
    ];

    return (
        <div className="relative overflow-hidden rounded-3xl h-[390px]">
            <Swiper
                className="w-auto h-full"
                modules={[Autoplay, Pagination, Navigation]}
                loop={true}
                autoplay={{
                    delay: 8000,
                    disableOnInteraction: false,
                }}
                effect="slide"
                fadeEffect={{
                    crossFade: true
                }}
                pagination={{
                    clickable: true,
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {bannerSlides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className={`absolute inset-0 bg-gradient-to-br rounded-2xl ${slide.background}`}
                        >
                            <div className="absolute inset-0 bg-black/20" />

                            {/* Navigation Buttons */}
                            <div className="absolute w-full flex items-center justify-between top-1/2 z-20 px-0">
                                <Button
                                    variant="default"
                                    size="icon"
                                    className="rounded-full w-12 h-12 bg-white/50 hover:bg-gray-500 cursor-pointer"
                                    onClick={() => swiperRef.current?.slidePrev()}
                                >
                                    <ArrowLeft className="h-6 w-6 text-white" />
                                </Button>
                                <Button
                                    variant="default"
                                    size="icon"
                                    className="rounded-full w-12 h-12 bg-white/50 hover:bg-gray-500 cursor-pointer"
                                    onClick={() => swiperRef.current?.slideNext()}
                                >
                                    <ArrowRight className="h-6 w-6 text-white" />
                                </Button>
                            </div>

                            <div className="relative z-10 flex items-center h-full p-8">
                                <div className="flex-1 max-w-2xl px-6">
                                    <h2 className="text-4xl font-bold text-white mb-4">{slide.title}</h2>
                                    <h3 className="text-xl text-white/90 mb-2">{slide.subtitle}</h3>
                                    <p className="text-white/80 mb-6 text-lg">{slide.description}</p>
                                    <Button className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30 rounded-2xl px-8 py-3" onClick={slide.onClick}>
                                        {slide.cta}
                                        <ArrowRight height={20} width={20} className="ml-2" />
                                    </Button>
                                </div>
                                <div className="hidden lg:block w-80 h-60">
                                    {slide.image && <Image
                                        src={slide.image || "/placeholder.svg"}
                                        alt="Banner"
                                        width={300}
                                        height={500}
                                        className="object-cover rounded-2xl w-full h-full"
                                    />}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default WelcomeSection;