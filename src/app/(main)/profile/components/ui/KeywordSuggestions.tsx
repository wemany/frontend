import { Badge } from "@/components/ui/badge"
import { KEYWORD_SUGGESTIONS } from "../../lib/constants/community.constants"
import { KeywordSuggestionsProps } from "../../types/community.types"
import { Plus } from "lucide-react"

const KeywordSuggestions = ({ onSuggestionClick }: KeywordSuggestionsProps) => {
    return (
        <div>
            <label className="block text-white font-medium mb-2">Sugerencias Populares</label>
            <div className="flex flex-wrap gap-2">
                {KEYWORD_SUGGESTIONS.map((suggestion) => (
                    <Badge
                        key={suggestion}
                        className="bg-gray-700/50 text-gray-300 border-gray-600/50 cursor-pointer hover:bg-purple-600/20 hover:text-purple-400 hover:border-purple-500/30 transition-colors"
                        onClick={() => onSuggestionClick(suggestion)}
                    >
                        <Plus className="h-3 w-3 mr-1" />
                        {suggestion}
                    </Badge>
                ))}
            </div>
        </div>
    )
}

export default KeywordSuggestions;