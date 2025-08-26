import { Button } from "@/components/ui/button";

interface HeaderRolesManagerProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;

}

const HeaderRolesManager = ({ setOpenModal }: HeaderRolesManagerProps) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-white">Gestión de Roles</h2>
                <p className="text-slate-400">Configura roles y permisos basados en hitos y combinaciones
                </p>
            </div>
            <Button className={`bg-purple-700/50 rounded-full hover:bg-purple-900 hover:scale-105 transition-all duration-300 cursor-pointer`}
                onClick={() => {
                    setOpenModal(true);
                }}
            >
                + Crear Rol
            </Button>
        </div>
    )
}

export default HeaderRolesManager;