import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle, Crown, Zap } from "lucide-react"

const MembershipPlansSection = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm border border-purple-500/30 p-6"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-indigo-600/5 to-blue-600/5" />

            <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Elige tu Plan</h3>
                    <p className="text-slate-300 text-sm">
                        Como usuario gratuito tienes acceso a{" "}
                        <span className="text-yellow-300 font-semibold">2 módulos</span>. Desbloquea contenido premium y
                        únete a <span className="text-purple-300 font-semibold">2,847 emprendedores</span>.
                    </p>
                </div>

                {/* Two Plans Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* VIP Plan */}
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-900/60 via-orange-900/60 to-red-900/60 backdrop-blur-sm border border-yellow-500/40 p-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 via-orange-600/10 to-red-600/10" />

                        <div className="relative z-10">
                            {/* VIP Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                                        <Crown className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white">Plan VIP</h4>
                                        <p className="text-yellow-200 text-xs">Más Popular</p>
                                    </div>
                                </div>
                                <Badge className="bg-yellow-500 text-black font-bold px-2 py-1 text-xs">50% OFF</Badge>
                            </div>

                            {/* VIP Benefits */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-yellow-100">
                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                    <span>4 módulos premium adicionales</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-yellow-100">
                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                    <span>Chats VIP exclusivos</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-yellow-100">
                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                    <span>3 clases semanales en vivo</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-yellow-100">
                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                    <span>Certificados profesionales</span>
                                </div>
                            </div>

                            {/* VIP Pricing */}
                            <div className="text-center mb-4">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <span className="text-2xl font-bold text-yellow-300">$47</span>
                                    <span className="text-sm text-yellow-400">/mes</span>
                                    <span className="text-sm text-yellow-500 line-through">$97</span>
                                </div>
                                <Button
                                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold rounded-xl py-2 text-sm"
                                //   onClick={() => {
                                //     setSelectedLockedModule({ requiredPlan: "vip" } as any)
                                //     setShowUpgradeModal(true)
                                //   }}
                                >
                                    <Crown className="mr-2 h-4 w-4" />
                                    Hazte VIP
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Premium Plan */}
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/60 via-indigo-900/60 to-blue-900/60 backdrop-blur-sm border border-purple-500/40 p-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-indigo-600/10 to-blue-600/10" />

                        <div className="relative z-10">
                            {/* Premium Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                                        <Zap className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white">Plan Premium</h4>
                                        <p className="text-purple-200 text-xs">Acceso Completo</p>
                                    </div>
                                </div>
                                <Badge className="bg-purple-500 text-white font-bold px-2 py-1 text-xs">ELITE</Badge>
                            </div>

                            {/* Premium Benefits */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-purple-100">
                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                    <span>Todo del plan VIP incluido</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-purple-100">
                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                    <span>6 módulos premium completos</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-purple-100">
                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                    <span>Asesorías 1:1 personalizadas</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-purple-100">
                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                    <span>Grupos masterminds exclusivos</span>
                                </div>
                            </div>

                            {/* Premium Pricing */}
                            <div className="text-center mb-4">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <span className="text-2xl font-bold text-purple-300">$97</span>
                                    <span className="text-sm text-purple-400">/mes</span>
                                    <span className="text-sm text-purple-500 line-through">$197</span>
                                </div>
                                <Button
                                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold rounded-xl py-2 text-sm"
                                //   onClick={() => {
                                //     setSelectedLockedModule({ requiredPlan: "premium" } as any)
                                //     setShowUpgradeModal(true)
                                //   }}
                                >
                                    <Zap className="mr-2 h-4 w-4" />
                                    Elegir Premium
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Benefits */}
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <div className="flex items-center justify-center gap-6 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span>Cancela cuando quieras</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span>Garantía 30 días</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span>Soporte 24/7</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default MembershipPlansSection;