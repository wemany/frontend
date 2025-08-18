"use client"

import { ListChecks, Users, Calendar, Trophy } from "lucide-react";
import FeatureCard from "../../components/ui/FeatureCard";
import { useRouter, useSearchParams } from "next/navigation";

interface QuickActionsProps {
    modulesCount: string;
    postCount: string;
    eventsCount: string;
    rankingPositionCommunity: number;
    slug: string
}

const QuickActionsSection = ({ modulesCount, postCount, eventsCount, rankingPositionCommunity, slug }: QuickActionsProps) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedStats = searchParams.get('stats');

    const handleItemClick = (quickAction: string) => {

        const currentPathname = `/communities/${slug}`;
        const params = new URLSearchParams(searchParams.toString());

        if (selectedStats === quickAction || quickAction === "Resumen") {
            params.delete('stats');
        } else {
            params.set('stats', quickAction);
        }

        router.push(`${currentPathname}?${params.toString()}`);
    };

    const QuickActionsList = [
        { icon: ListChecks, title: "Continuar Aprendiendo", description: `${modulesCount} módulos pendientes`, buttonText: "Ver Módulos", color: "purple", delay: 0.1, onClick: () => handleItemClick("modules") },
        { icon: Users, title: "Explorar Comunidad", description: `${postCount} posts nuevos`, buttonText: "Ver Posts", color: "blue", delay: 0.2, onClick: () => handleItemClick("posts") },
        { icon: Calendar, title: "Próximos Eventos", description: `${eventsCount} eventos esta semana`, buttonText: "Ver Eventos", color: "green", delay: 0.3, onClick: () => { } },
        { icon: Trophy, title: "Ver Ranking", description: `Posición #${rankingPositionCommunity}`, buttonText: "Ver Ranking", color: "yellow", delay: 0.4, onClick: () => { } }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {QuickActionsList.map((item, index) => (
                <FeatureCard
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    description={item.description}
                    buttonText={item.buttonText}
                    color={item.color}
                    delay={item.delay}
                    onClick={item.onClick}
                />
            ))}
        </div>
    )
}

export default QuickActionsSection;