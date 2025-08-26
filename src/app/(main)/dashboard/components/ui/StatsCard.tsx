import React from 'react';

interface StatsCardProps {
  value: string;
  label: string;
  color: string;
}
// Componente para mostrar una estadística simple
const StatsCard = ({ value, label, color }: StatsCardProps) => {
  const textColorClass = `text-${color}-400`;

  return (
    <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50">
      <div className={`text-3xl font-bold mb-2 ${textColorClass}`}>{value}</div>
      <div className="text-slate-400">{label}</div>
    </div>
  );
};

export default StatsCard;