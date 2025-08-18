import { ArrowLeft } from "lucide-react";

const InfoModulesManager = () => {
    return (
        <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                    <ArrowLeft className="h-4 w-4 text-blue-400 rotate-90" />
                </div>
                <div>
                    <h3 className="text-white font-medium">Reordenar Módulos</h3>
                    <p className="text-slate-400 text-sm">
                        Arrastra y suelta los módulos para cambiar su orden de aparición
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InfoModulesManager;