import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import "../../globals.css";
import ProfileSidebar from "@/components/Sidebar/components/profile/ProfileSidebar";

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-w-full">
        <ProfileSidebar />
        <SidebarInset className="p-5 flex-1">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
