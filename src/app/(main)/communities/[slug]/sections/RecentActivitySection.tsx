import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import AchievementCard from "../../components/ui/AchievementCard"
import GoalCard from "../../components/ui/GoalCard"
import { Achievement, Goal } from "../types/community";

interface RecentActivityProps {
    lastAchievements: Achievement[];
    upcomingGoals: Goal[];
}


const RecentActivitySection = ({ lastAchievements, upcomingGoals }: RecentActivityProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
        >
            {upcomingGoals.length < 0 || lastAchievements.length < 0 && <h4 className="text-xl font-semibold text-white">Actividad Reciente</h4>}
            <div className={`${upcomingGoals.length < 0 ? "" : "flex w-full"} gap-6`}>
                {lastAchievements.length > 0 && <div className="space-y-4 w-full">
                    <h4 className="text-lg font-medium text-white">Últimos Logros</h4>
                    <div className="space-y-3">
                        {lastAchievements.map((achievement, index) => (
                            <AchievementCard
                                key={index}
                                icon={CheckCircle}
                                color="green"
                                title={achievement.title}
                                description={`${achievement.title} ${achievement.point}`}
                            />
                        ))}
                    </div>
                </div>}

                {upcomingGoals.length > 0 && <div className="space-y-4 w-full">
                    <h4 className="text-lg font-medium text-white">Próximas Metas</h4>
                    <div className="space-y-3">
                        {upcomingGoals.map((goal, index) => (
                            <GoalCard
                                key={index}
                                title={goal.title}
                                progress={goal.progress}
                                label={goal.label}
                                color="purple"
                            />
                        ))}
                    </div>
                </div>}
            </div>
        </motion.div>
    )
}

export default RecentActivitySection