"use client"
import StatsCard from "@/app/(main)/dashboard/components/ui/StatsCard";
import { motion } from "framer-motion";

const StatsSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >

            <StatsCard value="2.8M+" label="Miembros Activos" color="purple" />
            <StatsCard value="500+" label="Comunidades" color="blue" />
            <StatsCard value="$50M+" label="Generados" color="green" />
            <StatsCard value="4.8★" label="Rating Promedio" color="yellow" />
        </motion.div>
    )
}

export default StatsSection;