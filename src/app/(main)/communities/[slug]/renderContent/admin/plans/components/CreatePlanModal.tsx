import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useMemo } from "react";
import { CreatePlanModalProps } from "../types/plan.type";
import { CreatePlanForm } from "../lib/schema/plan.schema";
import DialogForm from "./DialogForm";
import { usePlanForm } from "../hooks/usePlanForm";

const CreatePlanModal = ({ open, data, planToEdit, onOpenChange, onSubmit }: CreatePlanModalProps) => {

    const { form, isFormValid } = usePlanForm()

    const DEFAULT_VALUES: CreatePlanForm = useMemo(() => ({
        name: planToEdit?.name || "",
        description: planToEdit?.description || "",
        color: planToEdit?.color || "",
        price: planToEdit?.price || 0,
        currency: planToEdit?.currency_id || "",
        duration_unit: planToEdit?.duration_unit || "month",
        duration_value: planToEdit?.duration_value || 1,
        is_recurring: planToEdit?.is_recurring || false,
        features: planToEdit?.features || [],
    }), [planToEdit]);

    useEffect(() => {
        if (!open) {
            form.reset(DEFAULT_VALUES);
        }
    }, [open, form, DEFAULT_VALUES]);

    const handleSubmitPlan = async () => {
        const isValid = await form.trigger();
        if (isValid) {
            const formData = form.getValues();
            await onSubmit(formData);
            form.reset();
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-gray-900 border-gray-700 overflow-y-auto sm:max-w-3xl max-h-[900px]">
                <DialogHeader className="border-b border-gray-700 pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle className="text-2xl font-bold text-white">
                                {planToEdit ? "Editar Plan" : "Crear Nuevo Plan"}
                            </DialogTitle>
                        </div>
                    </div>
                </DialogHeader>
                <DialogForm
                    form={form}
                    onSubmit={handleSubmitPlan}
                    isFormValid={isFormValid}
                    isEditing={!!planToEdit}
                    data={data}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreatePlanModal;