"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CommunityFormHandlers, CreateCommunityModalProps, NavigationHandlers } from "../types/community.types"
import { useCommunityForm } from "../hooks/useCommunityForm"
import { useHandlers } from "../hooks/useHandlersProps"
import { MAX_STEPS } from "../lib/constants/community.constants"
import DialogHeaderSection from "./ui/DialogHeaderSection"
import DialogForm from "./DialogForm"

const CreateCommunityModal = ({ open, communityData, onOpenChange, onSubmit }: CreateCommunityModalProps) => {
    const communityForm = useCommunityForm()
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
        addFeatureToPlan,
        removeFeatureFromPlan,
        resetForm,
        canAddPlan,
        canRemovePlan
    } = communityForm

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
        addFeatureToPlan,
        removeFeatureFromPlan,
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