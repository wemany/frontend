"use client"

import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Community } from "../types/community";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserCommunities } from "@/context/UserCommunitiesContext";

const CommunitiesByUserSection = () => {
    const router = useRouter();
    const { userCommunities } = useUserCommunities();

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-sm font-medium text-slate-400">
                Mis Comunidades
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                    {userCommunities.length > 0 ? (userCommunities.map((community: Community) => (
                        <SidebarMenuItem key={community.id}>
                            <SidebarMenuButton asChild
                                className="transition-colors duration-200 hover:bg-gray-800/50 text-white rounded-full cursor-pointer"
                                onClick={() => {
                                    router.push(`/communities/${community.alias}`);
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex justify-center items-center w-6 h-6 bg-purple-600 rounded-full p-1">
                                        <Avatar className="flex justify-center items-center">
                                            <AvatarImage src="" className="w-6 h-6" />
                                            <AvatarFallback className="text-xs">
                                                {community.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <span className="font-medium">{community.name}</span>
                                </div>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))) : (<p className="text-sm text-slate-500 p-2">No estás en ninguna comunidad.</p>
                    )}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export default CommunitiesByUserSection;