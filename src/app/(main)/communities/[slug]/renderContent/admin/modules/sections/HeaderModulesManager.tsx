import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HeaderModulesManagerProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;

}

const HeaderModulesManager = ({ setOpenModal }: HeaderModulesManagerProps) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-white">Gestión de Módulos</h2>
                <p className="text-slate-400">Administra el contenido educativo de tu comunidad
                </p>
            </div>
            <Button className={`bg-purple-700/50  rounded-full hover:bg-purple-900 hover:scale-105 transition-all duration-300 cursor-pointer`}
                onClick={() => {
                    setOpenModal(true);
                }}
            >
                <Plus className="mr-2 h-4 w-4" />
                Crear Módulo
            </Button>
        </div>
    )
}

export default HeaderModulesManager;