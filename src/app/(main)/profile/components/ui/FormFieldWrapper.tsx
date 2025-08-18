import type { ReactNode } from "react"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface FormFieldWrapperProps {
    label?: string
    description?: string
    children: ReactNode
    required?: boolean
    error?: string
}

export function FormFieldWrapper({ label, description, children, required = false, error }: FormFieldWrapperProps) {
    return (
        <FormItem>
            {label && (
                <FormLabel className="text-white font-medium">
                    {label}
                    {required && <span className="text-red-400 ml-1">*</span>}
                </FormLabel>
            )}
            <FormControl>{children}</FormControl>
            {description && !error && <FormDescription className="text-slate-400 text-sm">{description}</FormDescription>}
            <FormMessage className="text-red-400" />
        </FormItem>
    )
}
