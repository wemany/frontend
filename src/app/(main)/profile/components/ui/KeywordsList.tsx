import { Badge } from "@/components/ui/badge"
import { KeywordsListProps } from "../../types/community.types"
import { Hash, X } from "lucide-react"

const KeywordsList = ({ keywords, onRemove }: KeywordsListProps) => {
    if (keywords.length === 0) return null

    return (
        <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
                <Badge
                    key={index}
                    className="bg-purple-600/20 text-purple-400 border-purple-500/30 cursor-pointer hover:bg-red-600/20 hover:text-red-400 hover:border-red-500/30 transition-colors"
                    onClick={() => onRemove(keyword)}
                >
                    <Hash className="h-3 w-3 mr-1" />
                    {keyword}
                    <X className="h-3 w-3 ml-1" />
                </Badge>
            ))}
        </div>
    )
}

export default KeywordsList;