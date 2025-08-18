"use client"

import { Globe } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "../../../ui/sidebar";
import ButtonToggle from "../../ButtonToggle";
import ProfileSection from "../../ProfileSection";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import DashboardSidebarContent from "./DashboardSidebarContent";
import SkeletonLoaderDashboardSidebar from "../../../ui/SkeletonLoaderDashboardSidebar";


const DashboardSidebar = () => {
    const { state, toggleSidebar } = useSidebar()
    const isCollapsed = state === "collapsed"
    const { data: session, status } = useSession();

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
                {/* {!isCollapsed && <SearchInput />} */}
                <DashboardSidebarContent />
            </SidebarContent>

            {/* Footer */}
            {!isCollapsed && (
                <SidebarFooter className="border-t-1 border-gray-800 pt-6">
                    <ProfileSection user={session.user as User} />
                </SidebarFooter>
            )}
        </Sidebar>
    )
}

export default DashboardSidebar;