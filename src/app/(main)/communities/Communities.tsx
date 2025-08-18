import HeroSectionCommunities from "./sections/HeroSectionCommunities/HeroSectionCommunities";
import MainContentSectionCommunities from "./sections/MainContentSectionCommunities/MainContentSectionCommunities";

const CommunitiesPage = () => {

    return (
        <section className="space-y-4">
            <HeroSectionCommunities />
            <MainContentSectionCommunities />
        </section>
    );
}

export default CommunitiesPage;