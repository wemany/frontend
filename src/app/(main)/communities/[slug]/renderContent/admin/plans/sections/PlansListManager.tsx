import CreateNew from "@/components/CreateNew";
import { Plan } from "../types/plan.type";
import CardPlan from "../components/ui/CardPlan";

interface PlansListManagerProps {
    plans: Plan[],
    isLoading: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    onEditPlan: (plan: Plan) => void;
    onDeletePlan: (plan: Plan) => void;
}

const PlansListManager = ({ plans, isLoading, setOpenModal, onEditPlan, onDeletePlan }: PlansListManagerProps) => {
    let containerClasses = "";
    switch (plans.length) {
        case 1:
            containerClasses = "max-w-lg mx-auto";
            break;
        case 2:
            containerClasses = "grid grid-cols-1 md:grid-cols-2 gap-6";
            break;
        case 3:
            containerClasses = "grid grid-cols-1 md:grid-cols-3 gap-6";
            break;
        default:
            containerClasses = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
            break;
    }
    return (
        <>
            {plans.length === 0 ? <CreateNew handleCreate={() => setOpenModal(true)} title="Crear Nuevo Plan" description="Crea un nuevo plan para tu comunidad" /> :
                <div className={containerClasses}>
                    {plans.map(plan => (
                        <CardPlan key={plan.id} plan={plan} isLoading={isLoading} onEdit={onEditPlan} onDelete={onDeletePlan} />
                    ))}
                </div>}
        </>
    );
}

export default PlansListManager;