import CommunityCard from "../../../components/ui/CommunityCard";
import { Badge } from "@/components/ui/badge";
import { Community } from "../../../types/communties";

interface CommunityListSectionProps {
    title: string;
    description?: string;
    data: Community[] | undefined;
}

const CommunityListSection = ({ title, description, data }: CommunityListSectionProps) => {

    const hasCommunities = data && data.length > 0;
    return (
        <>
            <div className="flex flex-col items-start gap-3 mb-8">
                <h2 className="flex items-center gap-3 text-3xl font-bold">
                    {title}
                    <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30">
                        {data?.length === 1 ? '1 comunidad' : `${data?.length} comunidades`}
                    </Badge>
                </h2>
                {description && <p className="text-gray-400">{description}</p>}
            </div>
            {hasCommunities ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {data?.map((communy) => (
                        <CommunityCard
                            key={communy.id}
                            community={communy}
                        />
                    ))}
                </div>) : (
                <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">
                        Oops! No communities found matching this criteria.
                    </p>

                </div>
            )}
        </>
    )
}

export default CommunityListSection;
