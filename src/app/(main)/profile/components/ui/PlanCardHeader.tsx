import { Button } from "@/components/ui/button";
import { PlanCardHeaderProps } from "../../types/community.types";
import { X } from "lucide-react";

const PlanCardHeader = ({ planIndex, canRemove, onRemove }: PlanCardHeaderProps) => {
    return (
        <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-medium">Plan {planIndex + 1}</h4>
            {canRemove && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onRemove}
                    className="text-red-400 hover:text-red-300 rounded-2xl"
                    aria-label={`Eliminar plan ${planIndex + 1}`}
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    )
}

export default PlanCardHeader;