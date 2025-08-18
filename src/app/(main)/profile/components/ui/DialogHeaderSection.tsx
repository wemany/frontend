"use client"

import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ModalHeaderSectionProps } from "../../types/community.types"

const DialogHeaderSection = ({ currentStep, totalSteps }: ModalHeaderSectionProps) => {
    return (
        <DialogHeader className="border-b border-gray-700 pb-4">
            <div className="flex items-center justify-between">
                <div>
                    <DialogTitle className="text-2xl font-bold text-white">Crear Nueva Comunidad</DialogTitle>
                    <p className="text-slate-400 mt-1">
                        Paso {currentStep} de {totalSteps}
                    </p>
                </div>
            </div>
        </DialogHeader>
    )
}

export default DialogHeaderSection;