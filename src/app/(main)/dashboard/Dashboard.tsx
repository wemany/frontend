import MainContentSectionCommunities from "../communities/sections/MainContentSectionCommunities/MainContentSectionCommunities";
import FeedSection from "./sections/FeedSection";
import StatsSection from "./sections/StatsSection";
import WelcomeSection from "./sections/WelcomeSection";

const DashboardPage = () => {

    return (
        <div className="grid grid-rows-1 grid-cols-1 lg:grid-rows-2 gap-4">
            <div className="col-span-2 row-span-2 w-full">
                <div className="flex gap-4 w-full">
                    <div className="flex flex-col w-full xl:w-4/5 gap-4">
                        <WelcomeSection />
                        <StatsSection />
                    </div>
                    <div className="hidden xl:block">
                        <FeedSection />
                    </div>
                </div>
            </div>
            <div>
                <MainContentSectionCommunities />
            </div>
        </div>

    );
}
export default DashboardPage;