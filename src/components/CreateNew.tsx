import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface CreateNewProps {
    handleCreate: () => void;
    title: string;
    description: string;
}


const CreateNew = ({ handleCreate, title, description }: CreateNewProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={handleCreate}
            className="group cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border-2 border-dashed border-gray-600 hover:border-purple-500/50 transition-all duration-300 flex flex-col items-center justify-center min-h-[400px]"
        >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Plus className="h-10 w-10 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-center max-w-xs">
                {description}
            </p>
        </motion.div>
    )
}

export default CreateNew;