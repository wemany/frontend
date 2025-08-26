import InfoScreenWrapper from "@/components/InfoScreenWrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const LockedViewPage = () => {
    return (
        <InfoScreenWrapper>
            <div className="w-5xl md:w-full h-full flex items-center justify-center relative overflow-hidden">
                <div className="w-full h-[700px] absolute left-[550px]">
                    <Image
                        src="/images/bg-locked-view.png"
                        alt="locked-view"
                        fill
                        className="object-contain opacity-30"
                    />
                </div>
                <div className="w-full max-w-lg z-10 py-8 rounded-2xl bg-black text-white flex flex-col items-center text-center">
                    <Image
                        src="/images/alert_icon.png"
                        alt="alert_icon"
                        width={50}
                        height={50}
                    />
                    <h2 className="text-xl md:text-2xl font-extrabold">
                        No tienes acceso a esta página
                    </h2>
                    <p className="text-xl md:text-lg text-white/50 mb-8">
                        Pero aún puedes suscribirte para ver todo su contenido.
                    </p>
                    <div className="flex w-full justify-center items-center gap-4">
                        <Button size="lg" className="w-auto bg-gray-900 border-none h-12 rounded-2xl text-white hover:bg-gray-700 transition-colors cursor-pointer">
                            Volver al inicio
                        </Button>
                        <Button size="lg" className="w-max bg-purple-400 border-none h-12 rounded-2xl text-white hover:bg-purple-600 transition-colors cursor-pointer">
                            Suscribirme
                        </Button>
                    </div>
                </div>
            </div>
        </InfoScreenWrapper>
    );
};

export default LockedViewPage;