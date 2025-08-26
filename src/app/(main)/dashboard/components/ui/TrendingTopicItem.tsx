import { TrendItemProps } from "../../types/trending";

const TrendingTopicItem = ({ trend }: TrendItemProps) => {

    return (
        <div
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
        >
            <div>
                <h4 className="font-medium text-purple-300 text-sm">{trend.topic}</h4>
                <p className="text-gray-500 text-xs font-open-sauce">{trend.posts}</p>
            </div>
        </div>
    )

}

export default TrendingTopicItem;