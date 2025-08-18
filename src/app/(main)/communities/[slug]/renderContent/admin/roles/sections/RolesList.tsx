import { Role } from "../types/role.type";
import CardRole from "../components/ui/CardRole";
import CreateNew from "@/components/CreateNew";

interface RolesListProps {
    roles: Role[];
    isRoleDataLoading: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    onEditRole: (role: Role) => void;
    onDeleteRole: (role: Role) => void;
}

const RolesList = ({ roles, setOpenModal, onEditRole, onDeleteRole }: RolesListProps) => {

    return (
        <>
            {roles.length === 0 ? (
                <CreateNew handleCreate={() => setOpenModal(true)} title="Crear Nuevo Rol" description="Crea tu primer rol para organizar tu comunidad" />
            ) : (
                roles.map((role) => (
                    <CardRole key={role.role_id} role={role} onEdit={onEditRole} onDelete={onDeleteRole} />
                ))
            )}
        </>
    )
}

export default RolesList;