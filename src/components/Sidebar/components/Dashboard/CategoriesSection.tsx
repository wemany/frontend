"use client"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import SkeletonLoaderSeccionCateories from "@/components/ui/SkeletonLoaderDashboardSidebar"
import { useGetCategories } from "@/hooks/useGetCategories"
import { Globe } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

const Categories = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get('category');

    const { isLoading, data, error } = useGetCategories()


    const handleItemClick = (categoryTitle: string) => {
        const currentPathname = '/dashboard';
        const params = new URLSearchParams(searchParams.toString());

        if (selectedCategory === categoryTitle || categoryTitle === "Todas") {
            params.delete('category');
        } else {
            params.set('category', categoryTitle);
        }

        router.push(`${currentPathname}?${params.toString()}`);
    };

    if (isLoading) {
        return <SkeletonLoaderSeccionCateories />
    }

    if (error) {
        return <div>Error al cargar las comunidades</div>;
    }

    const allCategories = [{ id: "all", name: "Todas" }, ...data];

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-sm font-medium text-slate-400">Categorías</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                    {allCategories.map((item) => {
                        const isActive = item.name === "Todas"
                            ? !selectedCategory
                            : selectedCategory === item.name;

                        return (
                            <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton
                                    className={`transition-colors duration-200 hover:bg-gray-900 hover:scale-105 cursor-pointer ${isActive ? "bg-purple-600/20 text-purple-400" : "hover:bg-gray-800/50 text-white"}`}
                                    onClick={() => handleItemClick(item.name)}
                                >
                                    {/* <item.icon width={5} height={5} /> */}
                                    <Globe width={5} height={5} />
                                    <span className="font-medium">{item.name}</span>
                                </SidebarMenuButton>
                                {/* <SidebarMenuBadge className="border-[1px] border-white-100 rounded-full pt-0.5 px-1">
                                    {item.count}
                                </SidebarMenuBadge> */}
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export default Categories