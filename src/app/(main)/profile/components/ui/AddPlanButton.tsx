import { Button } from "@/components/ui/button"
import { AddPlanButtonProps } from "../../types/community.types"
import { Plus } from "lucide-react"

const AddPlanButton = ({ onAdd, canAdd, currentPlansCount, maxPlans }: AddPlanButtonProps) => {
    return (
        <div className="space-y-2">
            <Button
                type="button"
                variant="outline"
                disabled={!canAdd}
                onClick={onAdd}
                className="w-full bg-gray-800/50 hover:bg-gray-700/50 text-white border-gray-700 rounded-2xl"
            >
                <Plus className="mr-2 h-4 w-4" />
                Agregar Otro Plan
            </Button>

            {!canAdd && (
                <p className="text-slate-500 text-sm text-center">
                    Has alcanzado el límite máximo de {maxPlans} planes ({currentPlansCount}/{maxPlans})
                </p>
            )}

            {canAdd && currentPlansCount > 0 && (
                <p className="text-slate-400 text-sm text-center">
                    Planes: {currentPlansCount}/{maxPlans}
                </p>
            )}
        </div>
    )
}

export default AddPlanButton;