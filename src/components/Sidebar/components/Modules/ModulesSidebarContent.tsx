"use client"

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge } from "@/components/ui/sidebar";
import { useStatsCommunitySidebar } from "@/hooks/useStatsCommunitySidebar";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { formatKey } from "../../utils/formatKey";
import SkeletonLoaderSeccionCateories from "@/components/ui/SkeletonLoaderDashboardSidebar";

const ModulesSidebarContent = () => {
    const router = useRouter()
    const params = useParams();
    const searchParams = useSearchParams();
    const selectedStats = searchParams.get('stats');
    const slug = params.slug as string;

    const { isLoading, data, error } = useStatsCommunitySidebar({ slug });

    const summaryEntry = { key: "resumen", value: 0 };

    const stats = data ? Object.entries(data) : [];

    const handleItemClick = (statsTitle: string) => {
        const currentPathname = `/communities/${slug}`;
        const params = new URLSearchParams(searchParams.toString());

        if (selectedStats === statsTitle || statsTitle === "resumen") {
            params.delete('stats');
        } else {
            params.set('stats', statsTitle);
        }

        router.push(`${currentPathname}?${params.toString()}`);
    };

    if (isLoading) {
        return <SkeletonLoaderSeccionCateories />
    }

    if (error) {
        return <div>Error cargando la info..</div>;
    }

    const allStats = [
        [summaryEntry.key, summaryEntry.value],
        ...stats
    ];

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                    {allStats.map(([key, value]) => {
                        const isActive = key === "resumen"
                            ? !selectedStats
                            : selectedStats === key;

                        return (
                            <SidebarMenuItem key={key}>
                                <SidebarMenuButton
                                    className={`transition-colors duration-200 hover:bg-gray-900 hover:scale-105 ${isActive ? "bg-purple-600/20 text-purple-400" : "hover:bg-gray-800/50 cursor-pointer"}`}
                                    onClick={() => handleItemClick(key.toString())}
                                >
                                    <div className="flex w-full items-center justify-between gap-2">
                                        <span className="font-medium">{formatKey(key.toString())} </span>
                                        {Number(value) > 0 &&
                                            <SidebarMenuBadge className="border-[1px] border-white-100 rounded-full pt-0.5 px-1">
                                                {Number(value)}
                                            </SidebarMenuBadge>
                                        }
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export default ModulesSidebarContent;