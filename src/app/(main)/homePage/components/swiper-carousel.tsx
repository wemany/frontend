"use client"
import "swiper/css"
import "swiper/css/effect-coverflow"

import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow } from "swiper/modules"
import Image from "next/image"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { Swiper as SwiperType } from 'swiper';

const slides = [
    { id: 1, image: "/images/homePage/section-1/image-6.png" },
    { id: 2, image: "/images/homePage/section-1/image-6.png" },
    { id: 3, image: "/images/homePage/section-1/image-6.png" },
    { id: 4, image: "/images/homePage/section-1/image-6.png" },
    { id: 5, image: "/images/homePage/section-1/image-6.png" },
    { id: 6, image: "/images/homePage/section-1/image-6.png" },
]

const SwiperCarousel = () => {
    const swiperRef = useRef<SwiperType | null>(null);
    return (
        <div className="w-full relative">
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                loop={true}
                coverflowEffect={{
                    rotate: 25,
                    stretch: 50,
                    depth: 180,
                    modifier: 0.6,
                }}
                modules={[EffectCoverflow]}
                className="mySwiper"
                initialSlide={4}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
                {slides.map((slide) => (
                    <SwiperSlide
                        key={slide.id}
                        className="!w-auto h-auto"
                    >
                        <div
                            className="rounded-2xl overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={slide.image}
                                alt={`Slide ${slide.id}`}
                                width={280}
                                height={400}
                                className=" object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute w-full flex items-center justify-between top-1/2 z-10 rounded-full">
                <Button
                    variant="default"
                    size="icon"
                    className="rounded-full w-12 h-12 bg-white/50 hover:bg-gray-500"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <ArrowLeft className="h-6 w-6 text-white" />
                </Button>
                <Button
                    variant="default"
                    size="icon"
                    className="rounded-full w-12 h-12 bg-white/50 hover:bg-gray-500"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <ArrowRight className="h-6 w-6 text-white" />
                </Button>
            </div>
        </div>
    );
}

export default SwiperCarousel;