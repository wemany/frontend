"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityListSection from "./components/CommunityListSection";
import { useSearchParams } from "next/navigation";
import { useGetCommunities } from "../../hooks/useGetCommunities";
import { PaginationWithLinks } from "@/components/ui/pagination-with-link";
import SkeletonLoaderSeccionCommunities from "../../components/ui/SkeletonLoaderSeccionCommunities";
import { cn } from "@/lib/utils";
import { communityFilters } from "./filters/communityFilters";
import { useUserCommunities } from "@/context/UserCommunitiesContext";
import BenefitdCommunities from "./components/FeaturedCommunities";

const MainContentSectionCommunities = () => {

    const { userCommunities } = useUserCommunities();
    const subscribedCommunityIds = userCommunities.map(community => community.id);

    const [activeTab, setActiveTab] = useState("discover")
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1')
    const postsPerPage = parseInt(searchParams.get('pageSize') || '30')
    const selectedCategory = searchParams.get('category');
    const { isLoading, data } = useGetCommunities(currentPage, postsPerPage)

    const communities = data?.communities || [];
    const { filteredCommunities, discover, filterItems, communityListItems, subscribed } = communityFilters({ communities, selectedCategory, subscribedCommunityIds })

    if (isLoading) {
        return <div className="container max-w-full pt-5 space-y-10">
            <SkeletonLoaderSeccionCommunities />
        </div>
    }

    if (!isLoading && communities.length === 0) {
        return (
            <div className="flex items-start justify-center h-screen">
                <h2 className="text-2xl lg:text-4xl font-semibold">
                    {selectedCategory
                        ? `No hay comunidades para la categoría "${selectedCategory}".`
                        : "No hay comunidades disponibles."
                    }
                </h2>
            </div>
        );
    }

    return (
        <div className="container max-w-full pt-5 space-y-10">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gray-900 border border-gray-800 rounded-2xl p-1 mb-8">
                    {filterItems.map((item) => (
                        <TabsTrigger
                            key={item.value}
                            value={item.value}
                            className={cn(
                                "p-0 rounded-xl cursor-pointer hover:scale-105",
                                "data-[state=active]:text-white",
                                {
                                    [item.bgColor]: activeTab === item.value
                                }
                            )}
                        >
                            <item.icon className="w-4 h-4 mr-2" />
                            <span className="hidden lg:block">{item.label}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
                <TabsContent value="discover" className="space-y-10">
                    {discover.length === 0 && subscribed.length === 0 ? (
                        <div className="flex items-start justify-center h-screen">
                            <h2 className="text-2xl lg:text-4xl font-semibold">No se encontraron comunidades en esta categoría.</h2>
                        </div>
                    ) : (
                        <>
                            {discover.length > 0 && (
                                <BenefitdCommunities data={discover} />
                            )}
                            <CommunityListSection
                                title="Explore All Communities"
                                data={subscribed}
                            />
                        </>
                    )}
                </TabsContent>
                {communityListItems.map((item) => (
                    <TabsContent key={item.value} value={item.value} className="space-y-10">
                        {item.data.length === 0 ? (
                            <div className="flex items-start justify-center h-screen">
                                <h2 className="text-2xl lg:text-4xl font-semibold">No hay comunidades que cumplan este filtro.</h2>
                            </div>
                        ) : (
                            <CommunityListSection
                                title={item.title}
                                description={item.description}
                                data={item.data}
                            />
                        )}
                    </TabsContent>
                ))}
            </Tabs>
            {filteredCommunities.length > 0 && (
                <div>
                    <PaginationWithLinks
                        page={currentPage}
                        pageSize={postsPerPage}
                        totalCount={data.total}
                    />
                </div>)}
        </div>
    )
}

export default MainContentSectionCommunities;