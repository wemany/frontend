import UserStatCard from "@/app/(main)/communities/components/ui/UserStatCard";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Target, Trophy, Zap } from "lucide-react";

const ProggressAccount = [
    { icon: CheckCircle, value: 3, description: "Módulos Completados", label: "de 6 totales", color: "text-green-400" },
    { icon: Zap, value: 2150, description: "XP Total Ganado", label: "+450 esta Semana", color: "text-yellow-400" },
    { icon: Target, value: "68%", description: "Progreso General", label: "Muy Buen Ritmo", color: "text-blue-400" },
    { icon: Clock, value: "24h", description: "Tiempo Invertido", label: "Este Mes", color: "text-purple-400" },
]

const ProgressSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 backdrop-blur-sm border border-purple-500/20 p-6"
        >
            {/* Title */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20">
                    <Trophy className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white">Tu Progreso</h3>
                    <p className="text-slate-400 text-sm">Sigue avanzando hacia tus metas</p>
                </div>
            </div>

            {/* Progress Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {ProggressAccount.map((item, index) => (
                    <UserStatCard
                        key={index}
                        icon={item.icon}
                        value={item.value}
                        description={item.description}
                        label={item.label}
                        color={item.color}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Progreso hacia el siguiente nivel</span>
                    <span className="text-slate-400 text-sm">Nivel 42 → 43</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-3">
                    <motion.div
                        className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: "68%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                    />
                </div>
                <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>2,150 XP</span>
                    <span>250 XP para siguiente nivel</span>
                </div>
            </div>
        </motion.div>
    )
}

export default ProgressSection;