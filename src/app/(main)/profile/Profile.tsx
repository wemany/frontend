"use client"

import SkeletonLoaderProfile from "./components/SkeletonLoaderProfile";
import { useProfileData } from "./hooks/useProfileData";
import MyCommunitiesSection from "./sections/MyCommunitiesSection";
import QuickActionSection from "./sections/QuickActionSection";
import RecentActivitySection from "./sections/RecentActivitySection";
import WelcomeSection from "./sections/WelcomSection";

const ProfilePage = () => {
    const { data, isLoading } = useProfileData();

    if (isLoading || !data) {
        return <SkeletonLoaderProfile />;
    }

    return (
        <div className="flex flex-col space-y-10">
            <WelcomeSection profile={data.profile} />
            <QuickActionSection communitiesCount={data.myCommunities.length} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RecentActivitySection />
                <MyCommunitiesSection communities={data.myCommunities} />
            </div>
        </div>
    )
}

export default ProfilePage;