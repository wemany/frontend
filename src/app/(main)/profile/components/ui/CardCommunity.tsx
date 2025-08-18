import { Badge } from "@/components/ui/badge";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { MyCommunities } from "../../types/profile.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { ButtonDetails } from "@/components/Buttons/ButtonsAuth";


const CardCommunity = ({ community }: { community: MyCommunities }) => {
    return (
        <Card
            className="h-28 border-none flex flex-row justify-between py-4 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative overflow-hidden"
        >
            <div className="absolute inset-0 z-0">
                {community.bannerUrl ? (
                    <>
                        <Image
                            src={community.bannerUrl}
                            alt={community.name}
                            fill
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20  to-black/90" />
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
            </div>
            <CardHeader className="flex flex-1 items-center justify-between px-3 relative z-10">
                <div className="flex items-center gap-3">
                    <Avatar className="flex justify-center h-12 w-12 rounded-full border-2 border-purple-500 items-center">
                        <AvatarImage src={community.logoUrl} className="w-full h-full" />
                        <AvatarFallback>
                            {community.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase()}

                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold">{community.name}</h3>
                        <p className="text-sm">{community.subscriberCount.toLocaleString()} miembros</p>
                    </div>
                </div>
            </CardHeader>
            <CardFooter className="relative z-10">
                <div className="flex flex-col items-end gap-4">
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">Fundador</Badge>
                    <ButtonDetails param={`communities/${community.alias}`} />
                </div>
            </CardFooter>
        </Card>
    )
}

export default CardCommunity;