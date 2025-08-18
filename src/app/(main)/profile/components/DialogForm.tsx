import { Form } from "@/components/ui/form";
import { StepRenderer } from "./StepRenderer";
import DialogFooter from "./DialogFooter";
import { ModalFormProps } from "../types/community.types";

const DialogForm = ({ form, communityData, currentStep, communityFormHandlers, navigationHandlers }: ModalFormProps) => {
    return (
        <Form {...form}>
            <form className="space-y-6">
                <StepRenderer
                    currentStep={currentStep}
                    form={form}
                    communityData={communityData}
                    onAddKeyword={communityFormHandlers.addTag}
                    onRemoveKeyword={communityFormHandlers.removeTag}
                    onAddPlan={communityFormHandlers.addPlan}
                    onRemovePlan={communityFormHandlers.removePlan}
                    onAddFeature={communityFormHandlers.addFeatureToPlan}
                    onRemoveFeature={communityFormHandlers.removeFeatureFromPlan}
                    canAddPlan={communityFormHandlers.canAddPlan()}
                    canRemovePlan={communityFormHandlers.canRemovePlan()}
                    onUpdatePlan={communityFormHandlers.updatePlan}
                />

                <DialogFooter {...navigationHandlers} />
            </form>
        </Form>
    )
}

export default DialogForm;