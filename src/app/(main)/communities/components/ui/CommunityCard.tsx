"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { Crown, Zap } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import PricingModal from "../PricingModal"
import { useState } from "react"
import { useCommunityActions } from "../../hooks/useCommunityActions"
import { useRouter } from "next/navigation"
import { Community } from "../../types/communties"
import { cn } from "@/lib/utils"
import "@/app/themes/crystal-card-classic.css"
import { useUserCommunities } from "@/context/UserCommunitiesContext"

interface CommunityCardProps {
    community: Community;
    variant?: "default" | "benefitd";
}

const CommunityCard = ({ community, variant = "default" }: CommunityCardProps) => {
    const router = useRouter();
    const [showModalPricing, setShowModalPricing] = useState(false)
    const { addCommunity } = useUserCommunities();
    const { joinCommunity } = useCommunityActions();

    const handlePlanSelect = async (price: number) => {
        const selectedPlan = community.planes?.find(p => p.price === price);

        if (!selectedPlan) {
            console.error("Plan seleccionado no encontrado.");
            return;
        }

        try {
            const result = await joinCommunity(community.id, selectedPlan.id);
            console.log({ result });
            if (result) {
                router.push(`/communities/${community.alias}`);
                addCommunity({
                    id: result.subscription.id,
                    alias: result.subscription.alias,
                    name: result.subscription.community_name,
                });
            }
        } catch (error) {
            console.error("No se pudo unir a la comunidad:", error);
            return
            // Por ejemplo: toast.error("Hubo un problema al unirte.");
        }
        setShowModalPricing(false);
    }

    const handleRoutePuh = (alias: string) => {
        router.push(`/communities/${alias}`);
    }

    const cardBaseClasses = "group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 flex flex-col border-2"
    const benefitdCardClasses = "crystal-card-classic hover:-rotate-1 hover:scale-105"

    const getCardStyles = () => {
        switch (variant) {
            case "benefitd":
                return cn(cardBaseClasses, benefitdCardClasses);
            case "default":
            default:
                return cn(cardBaseClasses);
        }
    };

    return (
        <>
            <motion.div
                key={community.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={getCardStyles()}
            >
                <Card className="flex flex-col h-full overflow-hidden p-0 bg-gradient-to-br from-dark-800/50 to-dark-900/50 backdrop-blur-sm border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                    {community.isSponsored && (
                        <div className="absolute top-4 left-4 z-10">
                            <Badge className="bg-yellow-500/90 text-black font-medium rounded-full">
                                <Crown className="mr-1 h-3 w-3" />
                                Destacado
                            </Badge>
                        </div>
                    )}

                    <CardHeader className="p-0">
                        <div className="relative h-48 overflow-hidden">
                            {community.coverImage ? (
                                <>
                                    <Image
                                        src={community.coverImage}
                                        alt={community.name}
                                        fill
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
                                </>
                            ) : (
                                // Random background color if no coverImage
                                <div
                                    className="w-full h-full"
                                    style={{
                                        background: `linear-gradient(to bottom right, hsl(${Math.random() * 360}, 70%, 60%), hsl(${Math.random() * 360}, 70%, 40%))`,
                                    }}
                                />
                            )}
                            {/* Premium Badge */}
                            {community.isSponsored && (
                                <div className="absolute bottom-4 left-4">
                                    <Badge className="bg-purple-600/90 rounded-full">
                                        <Zap className="mr-1 h-3 w-3" />
                                        Sponsor
                                    </Badge>
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 pt-0 flex flex-col flex-1">
                        {/* Community Info */}
                        <div className="flex items-center gap-3 mb-4">
                            <Avatar className="flex items-center justify-center h-12 w-12 border-2 rounded-full border-purple-500 flex-shrink-0">
                                <AvatarImage src={community.image} alt={community.name} className="h-11 w-11 rounded-full" />
                                <AvatarFallback>
                                    {community.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-lg group-hover:text-purple-300 transition-colors truncate">
                                        {community.name}
                                    </h3>
                                    {community.isSponsored && (
                                        <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 text-xs px-1 py-0 rounded-full">
                                            ✓
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm text-slate-400 truncate">Por {community.name}</p>
                                <div>
                                    <span className="text-xs text-slate-400">Miembros {" "}</span>
                                    <span className="text-xs text-slate-200">{community.members}</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-slate-300 text-sm mb-4 line-clamp-2 flex-1">{community.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-4">
                            {community.tags?.slice(0, 3).map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="outline"
                                    className="bg-gray-800/50 text-gray-300 border-gray-600 text-xs px-2 py-0 rounded-full"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* Action Button - Always at bottom */}
                        <div className="mt-auto">
                            <Button
                                onClick={() => community.isSubscribed ? handleRoutePuh(community.alias) : setShowModalPricing(true)}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-2xl group-hover:scale-105 transition-transform"
                            >
                                {community.isSubscribed ? "Ver Comunidad" : "Ver Planes"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
            <PricingModal
                isOpen={showModalPricing}
                onClose={() => setShowModalPricing(false)}
                title={community.name}
                description={community.description}
                avatar={community.image}
                avatarFallback={community.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                stats={{
                    members: community.members,
                    rating: community.rating,
                    reviews: community.reviews,
                }}
                plans={community.planes}
                onPlanSelect={handlePlanSelect}
            />
        </>
    )
}

export default CommunityCard