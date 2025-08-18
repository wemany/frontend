import { LucideIcon } from 'lucide-react';
import React from 'react';

interface AchievementCardProps {
    icon: LucideIcon;
    color: string;
    title: string;
    description: string;
}

const AchievementCard = ({ icon: Icon, color, title, description }: AchievementCardProps) => {

    return (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-800/30 border border-gray-700/50">
            <div className={`p-2 rounded-xl bg-${color}-600/20`}>
                {Icon && <Icon className={`h-5 w-5 text-${color}-400`} />}
            </div>
            <div>
                <p className="text-white font-medium">{title}</p>
                <p className="text-sm text-slate-400">{description}</p>
            </div>
        </div>
    );
};

export default AchievementCard;