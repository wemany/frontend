"use client"

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { motion } from "framer-motion";
import { Users, Trophy, Target, Flame, Zap, Globe, Edit3 } from "lucide-react";
import UserStatCard from "../../components/ui/UserStatCard";
import { useSession } from "next-auth/react";
import { Community } from "../types/community";
import { usePublishCommunity } from "../hooks/usePublishCommunity";
import Image from "next/image";
import { useState } from "react";
import { useUpdateCommunity } from "../hooks/useUpdateCommunity";
import EditCommunityDialog from "../Components/EditCommunityDialog";
import { Badge } from "@/components/ui/badge";


const CommunityOwnerSection = ({ community, slug }: { community: Community, slug: string }) => {
    const { data: session } = useSession()
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const { isPublishing, handleAction } = usePublishCommunity()
    const { handleSaveChanges } = useUpdateCommunity({ communityId: community.communityId })

    const CommunityOwnerList = [
        { icon: Trophy, value: community.levelUserInCommunity, descrition: "Nivel", color: "text-yellow-500" },
        { icon: Target, value: community.progressUserInCommunity, descrition: "progress", color: "text-green-500" },
        { icon: Flame, value: community.streakDays, descrition: "Racha", color: "text-orange-500" },
        { icon: Zap, value: community.rankingPositionCommunity, descrition: "Ranking", color: "text-purple-500" }
    ]
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm border border-purple-500/30 min-h-[500px] w-full p-5 flex flex-col justify-end relative"
            >
                <div className="absolute inset-0">
                    {community.bannerUrl ? (
                        <>
                            <Image
                                src={community.bannerUrl || "/placeholder.svg"}
                                alt="Community Banner"
                                fill
                                className="object-cover opacity-30"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
                        </>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-black"></div>
                    )}
                </div>
                {community.ownerId === session?.user?.id && (
                    <div className="absolute z-10 top-4 right-4">
                        <Button
                            onClick={() => { setIsEditDialogOpen(true) }}
                            size="sm"
                            className="bg-black/50 hover:bg-black/70 text-white border border-white/20 backdrop-blur-sm rounded-xl transition-all duration-200 hover:scale-105"
                        >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Editar Comunidad
                        </Button>
                    </div>
                )}
                <div className="absolute z-10 w-full pr-10">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <Avatar className="flex justify-center h-12 w-12 rounded-full border-2 border-purple-500 items-center" >
                                <AvatarImage src={community.logoUrl} alt="Community Owner" className="w-full h-full rounded-full" />
                                <AvatarFallback>
                                    {community.nameCommunity.substring(0, 1)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-bold">{community.nameCommunity}</h3>
                                <p className="w-96 text-slate-300 text-sm line-clamp-2 flex-1">{community.description}</p>
                                <Badge className="bg-purple-600/50 text-purple-400 border-blue-500/30 text-sm px-1 py-0 rounded-ful">
                                    {community.category}
                                </Badge>
                                <div className="flex items-center gap-3 text-xs text-slate-300">
                                    <div className="flex items-center gap-1">
                                        <Users className="h-3 w-3 text-blue-400" />
                                        <span>{community.subscriberCount} miembros</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {community.ownerId === session?.user?.id &&
                            <Button
                                onClick={() => handleAction(community.communityId, !community.publish, slug)}
                                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-200 hover:scale-105
                                ${isPublishing
                                        ? community.publish
                                            ? "bg-red-600/60 text-red-400 border border-red-500/50"
                                            : "bg-green-600/60 text-green-400 border border-green-500/50"
                                        : community.publish
                                            ? "bg-green-600/60 hover:bg-red-600/60 text-green-400 hover:text-red-400 border border-green-500/50 hover:border-red-500/50"
                                            : "bg-gray-600/60 hover:bg-green-600/60 text-gray-400 hover:text-green-400 border border-gray-500/50 hover:border-green-500/50"
                                    }`}
                            >
                                {isPublishing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                        {community.publish ? "Ocultando..." : "Publicando..."}
                                    </>
                                ) : (
                                    <>
                                        {community.publish ? (
                                            <>
                                                <Zap className="h-4 w-4 mr-2" />
                                                Ocultar Comunidad
                                            </>
                                        ) : (
                                            <>
                                                <Globe className="h-4 w-4 mr-2" />
                                                Publicar Comunidad
                                            </>
                                        )}
                                    </>
                                )}
                            </Button>
                        }
                    </div>
                    <div className="mb-3">
                        <h2 className="text-2xl font-bold text-white mb-1">¡Bienvenido de vuelta, {session?.user?.name}! 👋</h2>
                        <p className="text-slate-200 text-sm">
                            Continúa tu camino hacia el éxito en {community.category}. Tienes {community.modulesCount} módulos pendientes.
                        </p>
                    </div>
                    <div className="grid grid-cols-4 gap-3 mb-3">
                        {CommunityOwnerList.map((item, index) => (
                            <UserStatCard
                                key={index}
                                icon={item.icon}
                                value={item.value || 0}
                                description={item.descrition}
                                color={item.color}
                            />
                        ))}
                    </div>
                    {/* <div className="p-3 bg-blue-600/30 backdrop-blur-sm rounded-xl border border-blue-500/30">
                <div className="flex items-center gap-2">
                    <div className="p-1 bg-blue-500/20 rounded-lg">
                        <Bell className="h-3 w-3 text-blue-400" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">Anuncio de la Comunidad</h4>
                        <p className="text-blue-100 text-xs">
                            🎉 Nueva masterclass este viernes: Estrategias Avanzadas de Black Friday 2025
                        </p>
                    </div>
                    <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs px-2 py-1"
                    >
                        Ver
                    </Button>
                </div>
            </div> */}
                </div>
            </motion.div>
            <EditCommunityDialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                communityData={{
                    id: community.communityId,
                    name: community.nameCommunity,
                    description: community.description,
                    banner: community.bannerUrl,
                    logo: community.logoUrl,
                }}
                onSave={(updatedData) => handleSaveChanges(updatedData, slug)}
            />
        </>
    )
}

export default CommunityOwnerSection;