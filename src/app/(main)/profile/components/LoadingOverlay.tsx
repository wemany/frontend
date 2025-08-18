"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle, Loader2, LucideIcon, XCircle } from "lucide-react"
import { useState, useEffect, ReactNode } from "react"

interface LoadingStep {
    id: number
    text: string
    icon: LucideIcon
    duration: number
}

interface LoadingOverlayProps {
    isOpen: boolean
    hasError: boolean
    title: string
    description: ReactNode
    completionTitle: string
    completionDescription: ReactNode
    errorTitle: string
    errorDescription: ReactNode
    steps: LoadingStep[]
    loadingIcon?: LucideIcon
    onComplete: () => void
    onError: () => void
}

const LoadingOverlay = ({
    isOpen,
    hasError,
    title,
    description,
    completionTitle,
    completionDescription,
    errorTitle,
    errorDescription,
    steps,
    loadingIcon: Icon = Loader2,
    onError,
    onComplete,
}: LoadingOverlayProps) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [completedSteps, setCompletedSteps] = useState<number[]>([])
    const [isCompleted, setIsCompleted] = useState(false)

    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(0)
            setCompletedSteps([])
            setIsCompleted(false)
            return
        }

        if (hasError) {
            setIsCompleted(false);
            return;
        }

        let timeoutId: NodeJS.Timeout

        const processSteps = async () => {
            for (let i = 0; i < steps.length; i++) {
                setCurrentStep(i)

                await new Promise((resolve) => {
                    timeoutId = setTimeout(resolve, steps[i].duration)
                })

                setCompletedSteps((prev) => [...prev, i])
            }

            if (!hasError) {
                setIsCompleted(true)
                timeoutId = setTimeout(() => {
                    onComplete()
                }, 3000)
            }

        }

        if (isOpen && !hasError) {
            processSteps()
        }


        return () => {
            if (timeoutId) clearTimeout(timeoutId)
        }

    }, [isOpen, onComplete, steps, hasError])

    if (!isOpen) return null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gray-900 rounded-3xl border border-gray-700 p-8 max-w-md w-full text-center"
            >
                {hasError ? (
                    // Estado de Error
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: 0.6 }}
                            className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
                        >
                            <XCircle className="w-10 h-10 text-red-400" />
                        </motion.div>

                        <h2 className="text-2xl font-bold text-white mb-2">{errorTitle}</h2>

                        <p className="text-slate-400 mb-6">
                            {errorDescription}
                        </p>

                        <Button
                            onClick={onError}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 py-2"
                        >
                            Intentar de Nuevo / Cerrar
                        </Button>
                    </motion.div>
                ) : !isCompleted ? (
                    <>
                        {/* Header */}
                        <div className="mb-8">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="w-16 h-16 mx-auto mb-4 bg-purple-600/20 rounded-full flex items-center justify-center"
                            >
                                <Icon className="w-8 h-8 text-purple-400" />
                            </motion.div>

                            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>

                            <p className="text-slate-400">
                                {description}
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="space-y-4">
                            {steps.map((step, index) => {
                                const isActive = currentStep === index
                                const isStepCompleted = completedSteps.includes(index)
                                const IconComponent = step.icon

                                return (
                                    <motion.div
                                        key={step.id}
                                        initial={{ opacity: 0.3 }}
                                        animate={{
                                            opacity: isActive || isStepCompleted ? 1 : 0.3,
                                            scale: isActive ? 1.02 : 1,
                                        }}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30"
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isStepCompleted ? "bg-green-500/20 text-green-400" : isActive ? "bg-purple-500/20 text-purple-400" : "bg-gray-700/50 text-gray-500"}`}
                                        >
                                            {isStepCompleted ? <CheckCircle className="w-4 h-4" /> : <IconComponent className="w-4 h-4" />}
                                        </div>

                                        <span
                                            className={`text-sm font-medium transition-colors duration-300 ${isStepCompleted ? "text-green-400" : isActive ? "text-white" : "text-gray-500"}`}>
                                            {step.text}
                                        </span>

                                        {isActive && !isStepCompleted && (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                                className="ml-auto"
                                            >
                                                <Loader2 className="w-4 h-4 text-purple-400" />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )
                            })}
                        </div>
                    </>
                ) : (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: 0.6 }}
                            className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
                        >
                            <CheckCircle className="w-10 h-10 text-green-400" />
                        </motion.div>

                        <h2 className="text-2xl font-bold text-white mb-2">{completionTitle}</h2>

                        <p className="text-slate-400 mb-4">{completionDescription}</p>

                        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Un momento...
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    )
}
export default LoadingOverlay;