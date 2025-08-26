"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CommunityFormHandlers, CreateCommunityModalProps, NavigationHandlers } from "../types/community.types"
import { useCommunityForm } from "../hooks/useCommunityForm"
import { useHandlers } from "../hooks/useHandlersProps"
import { MAX_STEPS } from "../lib/constants/community.constants"
import DialogHeaderSection from "./ui/DialogHeaderSection"
import DialogForm from "./DialogForm"
import { useEffect } from "react"

const CreateCommunityModal = ({ open, communityData, initialData, onOpenChange, onSubmit }: CreateCommunityModalProps) => {
    const communityForm = useCommunityForm(initialData);
    const {
        form,
        currentStep,
        isLastStep,
        isFirstStep,
        goToNextStep,
        goToPreviousStep,
        addTag,
        removeTag,
        updatePlan,
        addPlan,
        removePlan,
        addBenefitToPlan,
        removeBenefitFromPlan,
        resetForm,
        canAddPlan,
        canRemovePlan
    } = communityForm

    useEffect(() => {
        if (initialData) {
            form.reset(initialData);
        }
    }, [initialData, form]);

    const { handleBack, handleNext } = useHandlers({
        form,
        isFirstStep,
        isLastStep,
        onOpenChange,
        onSubmit,
        resetForm,
        goToNextStep,
        goToPreviousStep,
    })

    const communityFormHandlers: CommunityFormHandlers = {
        addTag,
        removeTag,
        addPlan,
        removePlan,
        addBenefitToPlan,
        removeBenefitFromPlan,
        canAddPlan,
        canRemovePlan,
        updatePlan
    }

    const navigationHandlers: NavigationHandlers = {
        currentStep,
        totalSteps: MAX_STEPS,
        isFirstStep,
        isLastStep,
        onBack: handleBack,
        onNext: handleNext,
    }
    console.error({ form: form.getValues() })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-gray-900 border-gray-700 overflow-y-auto sm:max-w-3xl max-h-[900px]">
                <DialogHeaderSection currentStep={currentStep} totalSteps={MAX_STEPS} />
                <DialogForm
                    form={form}
                    currentStep={currentStep}
                    communityFormHandlers={communityFormHandlers}
                    navigationHandlers={navigationHandlers}
                    communityData={communityData}
                />
            </DialogContent>
        </Dialog>
    )
}


export default CreateCommunityModal;