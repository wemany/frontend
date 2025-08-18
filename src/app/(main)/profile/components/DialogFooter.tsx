"use client"

import { ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModalFooterProps } from "../types/community.types"
import { StepIndicator } from "./ui/StepIndicator"

const DialogFooter = ({ currentStep, totalSteps, isFirstStep, isLastStep, onBack, onNext }: ModalFooterProps) => {
    return (
        <div className="flex items-center justify-between pt-6 border-t border-gray-700">
            <Button type="button" variant="ghost" onClick={onBack} className="text-slate-400 hover:text-white rounded-2xl">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {isFirstStep ? "Cancelar" : "Anterior"}
            </Button>

            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

            <Button type="button" onClick={onNext} className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl">
                {isLastStep ? "Crear Comunidad" : "Siguiente"}
                {!isLastStep && <ChevronRight className="ml-2 h-4 w-4" />}
            </Button>
        </div>
    )
}

export default DialogFooter;