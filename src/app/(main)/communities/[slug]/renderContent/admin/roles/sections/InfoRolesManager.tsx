import { Badge } from "@/components/ui/badge"
import { availableMilestones } from "@/lib/data"
import { Link } from "lucide-react"

const InfoRolesManager = () => {
    return (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Hitos Disponibles por Plugin</h3>
            <p className="text-slate-300 mb-4">
                Estos son los hitos que puedes combinar para crear roles personalizados. Los datos provienen de diferentes plugins conectados.
            </p>
            {Object.entries(
                availableMilestones.reduce((acc, milestone) => {
                    if (!acc[milestone.plugin]) {
                        acc[milestone.plugin] = []
                    }
                    acc[milestone.plugin].push(milestone)
                    return acc
                }, {} as Record<string, typeof availableMilestones>)
            ).map(([pluginId, milestones]) => (
                <div key={pluginId} className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-lg bg-purple-600/20 flex items-center justify-center">
                            <Link className="h-4 w-4 text-purple-400" />
                        </div>
                        <h4 className="text-white font-medium">{milestones[0].pluginName}</h4>
                        <Badge className={`text-xs ${pluginId === 'wemany_internal' ? 'bg-blue-600/20 text-blue-400 border-blue-500/30' :
                            pluginId === 'shopify_api' ? 'bg-green-600/20 text-green-400 border-green-500/30' :
                                pluginId === 'facebook_api' ? 'bg-purple-600/20 text-purple-400 border-purple-500/30' :
                                    'bg-orange-600/20 text-orange-400 border-orange-500/30'
                            }`}>
                            {pluginId === 'wemany_internal' ? 'Interno' : 'API Externa'}
                        </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-8">
                        {milestones.map((milestone) => (
                            <div key={milestone.id} className="p-3 rounded-xl bg-gray-800/30 border border-gray-700/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-6 h-6 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400">
                                        <milestone.icon className="h-4 w-4" />
                                    </div>
                                    <h5 className="text-white font-medium text-sm">{milestone.name}</h5>
                                </div>
                                <p className="text-slate-400 text-xs">{milestone.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default InfoRolesManager;