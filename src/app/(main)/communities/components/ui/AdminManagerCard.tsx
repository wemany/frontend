import { motion } from "framer-motion";
import { ChevronRight, LucideIcon } from "lucide-react";

interface AdminManagerCardProps {
    icon: LucideIcon;
    name: string;
    description: string;
    count: string;
    color: string;
    delay: number;
    onClick: () => void;
}

const AdminManagerCard = ({ icon: Icon, name, description, count, color, delay, onClick }: AdminManagerCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer"
            onClick={onClick}
        >
            <div
                className="group cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 p-6">
                <div className="flex items-start gap-4 mb-4">
                    <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
                    >
                        <Icon className={`h-6 w-6`} />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                            {name}
                        </h3>
                        <p className="text-slate-400 text-sm mb-3">{description}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">{count}</span>
                        <span className="text-slate-400 text-sm">
                            {name}
                        </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
                </div>
            </div>
        </motion.div>
    )
}

export default AdminManagerCard;