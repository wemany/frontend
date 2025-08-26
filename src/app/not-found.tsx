"use client"
import InfoScreenWrapper from "@/components/InfoScreenWrapper";
import SearchInput from "@/components/SearchInput";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <InfoScreenWrapper>
            <div className="w-11/12 md:w-[850px] h-[550px] flex items-center justify-center relative">
                <div className="w-full h-full absolute">
                    <Image
                        src="/images/bg-not-found.png"
                        alt="not-found"
                        fill
                        className="object-cover opacity-10"
                    />
                </div>

                <div className="w-full relative z-10 text-white flex flex-col items-center text-center">
                    <h1 className="text-6xl md:text-9xl font-extrabold">404</h1>
                    <p className="text-xl md:text-3xl font-light mt-2 mb-18">
                        We couldn&apos;t find that page..
                    </p>
                    <SearchInput />
                    <Link
                        href="/"
                        className="mt-6 md:mt-8 inline-block text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-base"
                    >
                        <span>Or return to the </span>{" "}
                        <span className="underline">Home page</span>
                    </Link>
                </div>
            </div>
        </InfoScreenWrapper>
    );
}