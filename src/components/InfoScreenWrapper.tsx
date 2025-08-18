import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const InfoScreenWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-screen bg-gray-950 flex flex-col">
            <div className="flex items-center justify-between py-14 px-8">
                <div>
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={180}
                        height={54}
                        className="mx-auto lg:mx-0"
                    />
                </div>
                <Button
                    variant="default"
                    className="bg-purple-400 text-white hover:bg-purple-600 px-6 py-2 rounded-lg"
                    asChild
                >
                    <Link href="/">Volver al Inicio</Link>
                </Button>
            </div>
            <div className="flex items-center justify-center h-screen w-screen">

                {children}
            </div>
        </div>
    );
}

export default InfoScreenWrapper