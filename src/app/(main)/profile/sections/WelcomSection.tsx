import { Flame, Trophy, Zap } from "lucide-react";
import { Profile } from "../types/profile.type";

const WelcomeSection = ({ profile }: { profile: Profile }) => {

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-8 text-white">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">¡Bienvenida, {profile.full_name}! 👋</h1>
                        <p className="text-xl opacity-90">Continúa tu camino hacia el éxito</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold">Nivel 92</div>
                        <div className="text-sm opacity-75">
                            45680 / 50000 XP
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Flame className="h-6 w-6 text-orange-300" />
                            <span className="font-semibold">Racha Actual</span>
                        </div>
                        <div className="text-2xl font-bold">47 días</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Trophy className="h-6 w-6 text-yellow-300" />
                            <span className="font-semibold">Ranking</span>
                        </div>
                        <div className="text-2xl font-bold">#1</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                        <div className="flex items-center gap-3 mb-2">
                            <Zap className="h-6 w-6 text-blue-300" />
                            <span className="font-semibold">XP Semanal</span>
                        </div>
                        <div className="text-2xl font-bold">+2450</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeSection;