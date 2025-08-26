import React from 'react';
import { LucideIcon } from 'lucide-react';

interface UserStatCardProps {
    icon: LucideIcon
    value: string | number;
    description: string;
    label?: string;
    color: string;
}

const UserStatCard = ({ icon: Icon, value, description, label, color }: UserStatCardProps) => {

    return (
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50 text-center">
            <Icon height={20} width={20} className={`mx-auto mb-1 ${color}`} />
            {value && <p className={`text-lg font-bold ${color}`}>{value}</p>}
            <p className="text-xs text-slate-300">{description}</p>
            {label && <p className="text-xs text-slate-400">{label}</p>}
        </div>
    );
};

export default UserStatCard;