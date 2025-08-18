import { Form } from "@/components/ui/form";
import { ModalFormProps, PlanFieldKey } from "../types/plan.type";
import { Button } from "@/components/ui/button";
import PlanNameField from "./ui/PlanNameField";
import PlanDescriptionField from "./ui/PlanDescriptionField";
import ColorSelectorField from "@/components/ColorSelectorField";
import PlanPriceField from "./ui/PlanPriceField";
import PlanSelectCurrencyField from "./ui/PlanSelectCurrencyField";
import TypeSelector from "@/app/(main)/profile/components/ui/TypeSelector";
import { BaseOptionProps } from "@/app/(main)/profile/types/community.types";
import { CreditCard, Repeat } from "lucide-react";

const planTypeOptions: Omit<BaseOptionProps<boolean>, "isSelected" | "onSelect">[] = [
    {
        type: false,
        icon: <CreditCard className="h-5 w-5 text-blue-400" />,
        title: "Pago único",
        description: "El usuario paga una sola vez y obtiene acceso permanente",
    },
    {
        type: true,
        icon: <Repeat className="h-5 w-5 text-purple-400" />,
        title: "Pago recurrente",
        description: "El usuario paga periódicamente según la duración configurada",
    },
];
const DialogForm = ({ form, isEditing, data, isFormValid, onSubmit }: ModalFormProps) => {
    const price = form.watch("price");
    const isRecurring = form.watch("is_recurring");
    const isFreePlan = price === 0;
    const isRecurringError = form.formState.errors.is_recurring?.message;

    const handlePlanUpdate = (field: PlanFieldKey, value: number) => {
        form.setValue(field, value, {
            shouldDirty: true,
            shouldValidate: true
        });
    };

    const handleIsRecurringChange = (value: boolean) => {
        form.setValue("is_recurring", value, {
            shouldDirty: true,
            shouldValidate: true
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                <PlanNameField control={form.control} />
                <PlanDescriptionField control={form.control} />
                <ColorSelectorField
                    control={form.control}
                    name="color"
                    label="Color del Plan"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PlanPriceField control={form.control} handlePlanUpdate={handlePlanUpdate} />
                    <PlanSelectCurrencyField control={form.control} data={data.currencies} isFreePlan={isFreePlan} />
                </div>
                {isFreePlan ? (
                    <div className="text-sm text-green-400 bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Plan Gratuito: </span>
                            <span>Acceso permanente sin costo ni renovaciones</span>
                        </div>
                    </div>
                ) : <TypeSelector
                    selectedType={isRecurring}
                    onTypeChange={handleIsRecurringChange}
                    error={isRecurringError}
                    label="Tipo de Pago"
                    options={planTypeOptions}
                />}
                <Button
                    disabled={!isFormValid()}
                    type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl">
                    {isEditing ? "Guardar Cambios" : "Crear Rol"}
                </Button>
            </form>
        </Form>
    )
}

export default DialogForm;