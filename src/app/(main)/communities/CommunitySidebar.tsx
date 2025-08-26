"use client"

import { Globe, Home } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import ButtonToggle from "@/components/Sidebar/ButtonToggle";
import CommunitySidebarContent from "@/components/Sidebar/components/Community/CommunitySidebarContent";
import ProfileSection from "@/components/Sidebar/ProfileSection";
import SkeletonLoaderDashboardSidebar from "@/components/ui/SkeletonLoaderDashboardSidebar";
import CommunitySidebarAdminContent from "@/components/Sidebar/components/Community/CommunitySidebarAdminContent";
import { useState, useEffect } from "react";


const CommunitySidebar = () => {
    const { state, toggleSidebar } = useSidebar()
    const isCollapsed = state === "collapsed"
    const { data: session, status } = useSession();
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        setIsOwner(localStorage.getItem('isCommunityOwner') === 'true');
    }, []);

    if (status === "loading" || !session) {
        return <SkeletonLoaderDashboardSidebar />;
    }

    return (
        <Sidebar
            collapsible="icon"
            className="border-r border-gray-800 bg-gray-900/90 backdrop-blur-sm md:block fixed z-50"
        >
            <SidebarHeader className="py-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                    {!isCollapsed &&
                        <>
                            <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600">
                                <Globe className="size-5" />
                            </div>
                            <div>
                                <h2 className="font-semibold">Wemany</h2>
                                <p className="text-xs text-slate-400">Discover Communities</p>
                            </div>
                        </>
                    }
                    <ButtonToggle toggleSidebar={toggleSidebar} state={state} />
                </div>
            </SidebarHeader>

            <SidebarContent>
                {isOwner ? <CommunitySidebarAdminContent /> : <CommunitySidebarContent />}
            </SidebarContent>

            {/* Footer */}
            {!isCollapsed && (
                <SidebarFooter className="border-t-1 border-gray-800 pt-6">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 rounded-lg transition-colors">
                        <Home className="size-5" />
                        <span className="font-medium">Volver al Inicio</span>
                    </Link>
                    <ProfileSection user={session.user as User} />
                </SidebarFooter>
            )}
        </Sidebar>
    )
}

export default CommunitySidebar;