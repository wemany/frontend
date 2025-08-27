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
import { AlertCircleIcon, CreditCard, Repeat } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PlanDuration from "./ui/PlanDuration";
import PlanRolesField from "./ui/PlanRolesField";
import PlanBenefits from "./ui/PlanBenefits";

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
const DialogForm = ({ form, isEditing, role, data, isFormValid, onSubmit }: ModalFormProps) => {
    const { watch, formState } = form;
    const { price, is_recurring, benefits, duration_unit, duration_value, role: selectedRoles } = watch();

    const plan = { duration_unit, duration_value };

    const isFreePlan = price === 0;
    const isPaidPlan = price > 0;
    const isRecurringError = formState.errors.is_recurring?.message;

    const handlePlanUpdate = (field: PlanFieldKey, value: number | string) => {
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

    const addBenefit = () => {
        const currentBenefits = form.getValues("benefits");
        const updatedBenefits = [...currentBenefits, ""];
        form.setValue("benefits", updatedBenefits, {
            shouldValidate: true,
            shouldTouch: true,
        });
    };

    const removeBenefit = (benefitIndex: number) => {
        const currentBenefits = form.getValues("benefits");
        if (currentBenefits.length > 1) {
            const updatedBenefits = currentBenefits.filter((_, i) => i !== benefitIndex);
            form.setValue("benefits", updatedBenefits, {
                shouldValidate: true,
                shouldTouch: true,
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                <Alert className="bg-yellow-300 text-black/70 items-center">
                    <AlertCircleIcon />
                    <AlertTitle className="font-bold text-lg">Recuerda:</AlertTitle>
                    <AlertDescription className="font-semibold">
                        Si en el futuro archivas este plan, tus miembros actuales seguirán activos y pagando, pero no se permitirán nuevos registros.
                    </AlertDescription>
                </Alert>

                <PlanNameField control={form.control} error={formState.errors.name?.message} />
                <PlanDescriptionField control={form.control} error={formState.errors.description?.message} />
                <ColorSelectorField
                    control={form.control}
                    name="color"
                    label="Color del Plan"
                />
                <PlanRolesField control={form.control} roles={role} selectedRoles={selectedRoles} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PlanPriceField control={form.control} handlePlanUpdate={handlePlanUpdate} />
                    <PlanSelectCurrencyField control={form.control} data={data.currencies} isFreePlan={isFreePlan} />
                </div>
                {isFreePlan && <div className="text-sm text-green-400 bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Plan Gratuito: </span>
                        <span>Acceso permanente sin costo ni renovaciones</span>
                    </div>
                </div>
                }
                {isPaidPlan && <TypeSelector
                    selectedType={is_recurring}
                    onTypeChange={handleIsRecurringChange}
                    error={isRecurringError}
                    label="Tipo de Pago"
                    options={planTypeOptions}
                />
                }
                {isPaidPlan && is_recurring && <PlanDuration control={form.control} plan={plan} handlePlanUpdate={handlePlanUpdate} />}

                <PlanBenefits control={form.control} benefits={benefits} onAddBenefit={addBenefit} onRemoveBenefit={removeBenefit} />

                <Button
                    disabled={!isFormValid()}
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl">
                    {isEditing ? "Guardar Cambios" : "Crear Rol"}
                </Button>
            </form>
        </Form>
    )
}

export default DialogForm;