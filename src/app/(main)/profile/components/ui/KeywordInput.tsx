import { Input } from "@/components/ui/input"
import { KeywordInputProps } from "../../types/community.types"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const KeywordInput = ({ value, onChange, onKeyPress, onAdd, disabled }: KeywordInputProps) => {
    return (
        <div className="flex gap-2">
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={onKeyPress}
                placeholder="Ej: marketing digital, emprendimiento, ventas..."
                className="bg-gray-800/50 border-gray-700 text-white rounded-2xl flex-1"
                disabled={disabled}
            />
            <Button
                type="button"
                onClick={onAdd}
                disabled={disabled || !value.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl"
                aria-label="Agregar palabra clave"
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    )
}

export default KeywordInput