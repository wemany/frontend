"use client"

import { usePathname, useSearchParams } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import CommunitySidebar from "./CommunitySidebar";
import Header from "./[slug]/renderContent/member/modules/components/Header";
import ModuleSidebar from "../../../components/Sidebar/components/Modules/ModuleSidebar";
import { useEffect, useState } from "react";

const CommunityLayoutContent = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isModuleRoute = pathname.includes("/modules/");

    const searchParams = useSearchParams();
    const moduleName = searchParams.get('module_name');

    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        setIsOwner(localStorage.getItem('isCommunityOwner') === 'true');
    }, []);

    if (isModuleRoute && !isOwner) {
        return (
            <SidebarProvider defaultOpen={true}>
                <div className="flex min-h-screen w-full">
                    <div className="flex-1 flex flex-col min-w-0">
                        <Header moduleName={moduleName} />
                        <main className="flex-1">{children}</main>
                    </div>
                    <ModuleSidebar />
                </div>
            </SidebarProvider>
        );
    }

    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex min-w-full">
                <CommunitySidebar />
                <SidebarInset className="p-5 flex-1">
                    {children}
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}

export default CommunityLayoutContent;