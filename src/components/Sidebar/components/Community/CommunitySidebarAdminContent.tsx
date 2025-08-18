import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { formatKey } from "../../utils/formatKey";

const CommunitySidebarAdminContent = () => {

    const params = useParams();
    const slug = params.slug as string;

    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedStats = searchParams.get('stats');


    const stats = Object.entries({
        resumen: '0',
        modules: "0",
        roles: "0"
    });

    const handleItemClick = (adminAction: string) => {

        const currentPathname = `/communities/${slug}`;
        const params = new URLSearchParams(searchParams.toString());

        if (selectedStats === adminAction || adminAction === "Resumen") {
            params.delete('stats');
        } else {
            params.set('stats', adminAction);
        }

        router.push(`${currentPathname}?${params.toString()}`);
    };

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {stats.map(([key, value]) => {
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
    );
};

export default CommunitySidebarAdminContent;
