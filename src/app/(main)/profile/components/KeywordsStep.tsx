"use client"

import type React from "react"
import { useState } from "react"
import { FormField } from "@/components/ui/form"
import { KeywordsStepProps } from "../types/community.types"
import { FormFieldWrapper } from "./ui/FormFieldWrapper"
import KeywordInput from "./ui/KeywordInput"
import KeywordsList from "./ui/KeywordsList"
import KeywordSuggestions from "./ui/KeywordSuggestions"
import { TAGS_LENGTH } from "../lib/constants/community.constants"

const KeywordsStep = ({ form, onAddKeyword, onRemoveKeyword }: KeywordsStepProps) => {
    const [currentKeyword, setCurrentKeyword] = useState("")
    const { control, watch } = form
    const keywords = watch("tags")
    const hasReachedLimit = keywords.length >= TAGS_LENGTH.MAX;

    const handleAddKeyword = () => {
        if (currentKeyword.trim() && !hasReachedLimit) {
            onAddKeyword(currentKeyword)
            setCurrentKeyword("")
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleAddKeyword()
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        if (!keywords.includes(suggestion) && !hasReachedLimit) {
            onAddKeyword(suggestion)
        }
    }

    return (
        <div className="space-y-6">
            <FormField
                control={control}
                name="tags"
                render={() => (
                    <FormFieldWrapper
                        label="Etiquetas"
                        description="Agrega etiquetas que ayuden a las personas a encontrar tu comunidad (similar a YouTube)"
                        required
                    >
                        <div className="space-y-4">
                            <KeywordInput
                                value={currentKeyword}
                                onChange={setCurrentKeyword}
                                onKeyPress={handleKeyPress}
                                onAdd={handleAddKeyword}
                                disabled={hasReachedLimit}
                            />

                            <KeywordsList keywords={keywords} onRemove={onRemoveKeyword} />

                            {keywords.length === 0 && (
                                <p className="text-slate-500 text-sm">Agrega al menos {TAGS_LENGTH.MIN} palabras clave para mejorar la visibilidad</p>
                            )}
                            {keywords.length >= TAGS_LENGTH.MAX && (
                                <p className="text-red-400 text-sm">Has alcanzado el límite de {TAGS_LENGTH.MAX} palabras clave.</p>
                            )}
                        </div>
                    </FormFieldWrapper>
                )}
            />

            <KeywordSuggestions onSuggestionClick={handleSuggestionClick} />
        </div>
    )
}

export default KeywordsStep;
