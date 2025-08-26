import { BookOpen, Briefcase, UserCog } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminManagerCard from "../../components/ui/AdminManagerCard";


interface CommunityManagerProps {
    modulesCount: string;
    plansCount: string;
    rolesCount: string;
    slug: string
}

const CommunityManagerSection = ({ modulesCount, plansCount, rolesCount, slug }: CommunityManagerProps) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedStats = searchParams.get('stats');

    const adminModules = [
        {
            id: "modules",
            name: "Módulos",
            description: "Gestiona el contenido educativo de tu comunidad",
            icon: BookOpen,
            color: "from-blue-500 to-cyan-600",
            count: modulesCount,
            onClick: () => handleItemClick("modules")
        },
        {
            id: "plans",
            name: "Planes",
            description: "Configura los planes de suscripción y monetización",
            icon: Briefcase,
            color: "from-green-500 to-emerald-600",
            count: plansCount || "0",
            onClick: () => handleItemClick("plans")
        },
        {
            id: "roles",
            name: "Roles",
            description: "Configura roles y permisos basados en hitos",
            icon: UserCog,
            color: "from-orange-500 to-red-600",
            count: rolesCount,
            onClick: () => handleItemClick("roles")
        },
    ]

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminModules.map((module, index) => (
                <AdminManagerCard
                    key={index}
                    icon={module.icon}
                    name={module.name}
                    description={module.description}
                    count={module.count}
                    color={module.color}
                    delay={index * 0.1}
                    onClick={() => handleItemClick(module.id)}
                />
            ))}
        </div>
    )
}

export default CommunityManagerSection;