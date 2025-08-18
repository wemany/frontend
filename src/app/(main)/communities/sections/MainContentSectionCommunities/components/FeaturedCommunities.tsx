import { Crown } from "lucide-react";
import { Community } from "../../../types/communties";
import { Badge } from "@/components/ui/badge";
import CommunityCard from "../../../components/ui/CommunityCard";

const FeaturedCommunities = ({ data }: { data: Community[] | undefined }) => {
    return (
        <>
            <div className="flex items-center gap-3 mb-8">
                <Crown className="w-7 h-7 text-yellow-500" />
                <h2 className="flex items-center gap-3 text-3xl font-bold">
                    <span>Featured Communities </span>
                    <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">
                        {data?.length} comunidades
                    </Badge>
                </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {data?.map((communy) => (
                    <CommunityCard
                        key={communy.id}
                        community={communy}
                        variant="featured"
                    />
                ))}
            </div>
        </>
    )
}

export default FeaturedCommunities;