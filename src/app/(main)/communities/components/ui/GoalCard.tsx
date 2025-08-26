import { Progress } from '@/components/ui/progress';
import React from 'react';

interface GoalCardProps {
    title: string;
    progress: number;
    label: string;
    color: string;
}

const GoalCard = ({ title, progress, label, color }: GoalCardProps) => {
    const progressBarClass = `h-2 bg-gray-700 [&>div]:bg-${color}-600`;

    return (
        <div className="p-4 rounded-2xl bg-gray-800/30 border border-gray-700/50">
            <div className="flex items-center justify-between mb-2">
                <p className="text-white font-medium">{title}</p>
                <span className="text-sm text-slate-400">{progress}%</span>
            </div>
            <Progress value={progress} className={progressBarClass} />
            <p className="text-sm text-slate-400 mt-2">{label}</p>
        </div>
    );
};

export default GoalCard;