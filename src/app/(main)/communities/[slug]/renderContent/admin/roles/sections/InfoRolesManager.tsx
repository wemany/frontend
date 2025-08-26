"use client"

import { apiPlatforms, availableMilestones } from "@/lib/data"
import { Plus, X, Zap } from "lucide-react"
import { useState } from "react"

const InfoRolesManager = () => {
    const [selectedApiPlatform, setSelectedApiPlatform] = useState<string>("wemany_internal")
    const [showAllMilestonesModal, setShowAllMilestonesModal] = useState(false)

    const filteredMilestones = availableMilestones.filter((milestone) => milestone.pluginId === selectedApiPlatform)
    const displayedMilestones = filteredMilestones.slice(0, 5)
    const hasMoreMilestones = filteredMilestones.length > 5


    return (
        <>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">Hitos Disponibles</h3>
                <p className="text-slate-300 mb-4">
                    Selecciona una plataforma para ver los hitos disponibles que puedes usar para crear roles
                    personalizados.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                    {apiPlatforms.map((platform) => (
                        <button
                            key={platform.id}
                            onClick={() => setSelectedApiPlatform(platform.id)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedApiPlatform === platform.id
                                ? `${platform.color} text-white shadow-lg`
                                : `bg-gray-800/50 text-slate-300 ${platform.hoverColor} hover:text-white border border-gray-700/50`
                                }`}
                        >
                            {platform.name}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayedMilestones.map((milestone) => (
                        <div
                            key={milestone.id}
                            className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-purple-500/30 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400">
                                    <milestone.icon className="h-4 w-4" />
                                </div>
                                <div>
                                    <h4 className="text-white font-medium text-sm">{milestone.name}</h4>
                                    <p className="text-slate-400 text-xs capitalize">{milestone.type}</p>
                                </div>
                            </div>
                            <p className="text-slate-400 text-xs">{milestone.description}</p>
                        </div>
                    ))}

                    {hasMoreMilestones && (
                        <button
                            onClick={() => setShowAllMilestonesModal(true)}
                            className="p-4 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[120px] cursor-pointer"
                        >
                            <div className="w-8 h-8 rounded-lg bg-purple-600/30 flex items-center justify-center text-purple-400">
                                <Plus className="h-4 w-4" />
                            </div>
                            <div className="text-center">
                                <h4 className="text-white font-medium text-sm">Ver más hitos</h4>
                                <p className="text-slate-400 text-xs">+{filteredMilestones.length - 5} hitos adicionales</p>
                            </div>
                        </button>
                    )}
                </div>
                {filteredMilestones.length === 0 && (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-2xl bg-gray-800/50 flex items-center justify-center mx-auto mb-4">
                            <Zap className="h-8 w-8 text-gray-500" />
                        </div>
                        <h4 className="text-white font-medium mb-2">No hay hitos disponibles</h4>
                        <p className="text-slate-400 text-sm">Esta plataforma aún no tiene hitos configurados.</p>
                    </div>
                )}
            </div>
            {showAllMilestonesModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-2xl border border-gray-700/50 max-w-4xl w-full max-h-[80vh] overflow-hidden">
                        <div className="p-6 border-b border-gray-700/50 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-white">
                                    Todos los hitos - {apiPlatforms.find((p) => p.id === selectedApiPlatform)?.name}
                                </h3>
                                <p className="text-slate-400 text-sm mt-1">{filteredMilestones.length} hitos disponibles</p>
                            </div>
                            <button
                                onClick={() => setShowAllMilestonesModal(false)}
                                className="w-8 h-8 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredMilestones.map((milestone) => (
                                    <div
                                        key={milestone.id}
                                        className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-purple-500/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400">
                                                <milestone.icon className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium text-sm">{milestone.name}</h4>
                                                <p className="text-slate-400 text-xs capitalize">{milestone.type}</p>
                                            </div>
                                        </div>
                                        <p className="text-slate-400 text-xs">{milestone.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default InfoRolesManager;