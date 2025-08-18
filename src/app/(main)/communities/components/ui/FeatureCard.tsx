import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    buttonText: string;
    color: string;
    delay: number;
    onClick: () => void;
}

const FeatureCard = ({ icon: Icon, title, description, buttonText, color, delay, onClick }: FeatureCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer"
            onClick={onClick}
        >
            <div className={`p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-${color}-500/50 transition-all duration-300`}>
                <div className={`flex items-center gap-3 mb-4`}>
                    <div className={`p-3 rounded-2xl bg-${color}-600/20 group-hover:bg-${color}-600/30 transition-colors`}>
                        <Icon className={`h-6 w-6 text-${color}-400`} />
                    </div>
                    <div>
                        <h3 className={`font-semibold text-white`}>{title}</h3>
                        <p className={`text-sm text-slate-400`}>{description}</p>
                    </div>
                </div>
                <Button className={`w-full bg-${color}-600 hover:bg-${color}-700 text-white rounded-2xl`}>
                    {buttonText}
                </Button>
            </div>
        </motion.div>
    )
}

export default FeatureCard;