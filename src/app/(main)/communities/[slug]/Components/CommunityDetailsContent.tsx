import { useSession } from "next-auth/react";
import CommunityOwnerSection from "../sections/CommunityOwnerSection";
import QuickActionsSection from "../sections/QuickActionsSection";
import RecentActivitySection from "../sections/RecentActivitySection";
import { Community } from "../types/community";
import CommunityManagerSection from "../sections/CommunityManagerSection";

const CommunityDetailsContent = ({ community, slug }: { community: Community, slug: string }) => {
    const { data: session } = useSession()
    return (
        <div className="grid grid-cols-1 grid-rows-1 gap-10">
            {/* Community Owner Section - Compact */}
            <CommunityOwnerSection community={community} slug={slug} />
            {/* Quick Actions */}
            {community.ownerId !== session?.user?.id ?
                <QuickActionsSection
                    modulesCount={community.modulesCount}
                    postCount={community.postCount}
                    eventsCount={community.eventsCount}
                    rankingPositionCommunity={community.rankingPositionCommunity}
                    slug={slug}
                /> :
                <CommunityManagerSection
                    slug={slug}
                    modulesCount={community.modulesCount}
                    plansCount={community.plansCount}
                    rolesCount={community.rolesCount}
                />
            }
            {/* Recent Activity */}
            <RecentActivitySection
                lastAchievements={community.LastAchievements}
                upcomingGoals={community.upcomingGoals}
            />
        </div>
    )
}

export default CommunityDetailsContent;