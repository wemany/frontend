import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useMemo } from "react";
import { CreatePlanModalProps } from "../types/plan.type";
import { CreatePlanForm } from "../lib/schema/plan.schema";
import DialogForm from "./DialogForm";
import { DURATION_UNITS_VALUES } from "@/app/(main)/profile/lib/constants/community.constants";
import { useForm } from "react-hook-form";

const CreatePlanModal = ({ open, data, roles, planToEdit, onOpenChange, onSubmit }: CreatePlanModalProps) => {

    console.log({ planToEdit });
    const DEFAULT_VALUES: CreatePlanForm = useMemo(() => ({
        name: planToEdit?.name || "",
        description: planToEdit?.description || "",
        color: planToEdit?.color || "",
        role: planToEdit?.roles?.map(r => r.id) || [],
        price: planToEdit?.price || 0,
        currency: planToEdit?.currency_code || "USD",
        duration_unit: planToEdit?.duration_unit || DURATION_UNITS_VALUES[3],
        duration_value: planToEdit?.duration_value || 1,
        is_recurring: planToEdit?.is_recurring || false,
        benefits: planToEdit?.benefits || [""],
    }), [planToEdit]);


    const form = useForm({
        defaultValues: DEFAULT_VALUES
    })

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
                    isFormValid={() => form.formState.isValid}
                    isEditing={!!planToEdit}
                    data={data}
                    role={roles || []}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreatePlanModal;