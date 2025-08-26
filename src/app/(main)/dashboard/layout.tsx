import "../../globals.css";
import DashboardSidebar from "@/components/Sidebar/components/Dashboard/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex min-w-full">
                <DashboardSidebar />
                <SidebarInset className="p-5 flex-1">
                    {children}
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
