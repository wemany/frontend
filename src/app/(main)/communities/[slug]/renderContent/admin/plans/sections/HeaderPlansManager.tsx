import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HeaderPlansManagerProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    plansCount: number;
    isLoading?: boolean;
}

const HeaderPlansManager = ({ setOpenModal, plansCount, isLoading }: HeaderPlansManagerProps) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-white">Gestión de Planes</h2>
                <p className="text-slate-400">Administra los planes de tu comunidad</p>
            </div>
            <Button className={`bg-purple-700/50 rounded-full hover:bg-purple-900 hover:scale-105 transition-all duration-300 cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                    setOpenModal(true);
                }}
                disabled={plansCount >= 3}
            >
                <Plus className="mr-2 h-4 w-4" />
                Crear Plan {plansCount >= 3 && "(Máximo 3)"}

            </Button>
        </div>
    )
}

export default HeaderPlansManager;