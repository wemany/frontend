"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { Heart, MessageCircle, Share2, Lock } from "lucide-react"
import { PostCardProps } from "../../types/post"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const PostCard = ({ post }: PostCardProps) => {
    return (
        <Card
            key={post.id}
            className="flex flex-col justify-evenly text-white bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors pt-2 max-w-[350px] h-full text-xs py-2 gap-3"
        >
            <CardHeader className="pb-0 px-1">
                <div className="flex items-start space-x-2">
                    <div className="flex justify-center items-center w-8 h-8 bg-gray-600 rounded-full p-1">
                        <Avatar>
                            <AvatarImage src="/icons/icon-profile.png" />
                            <AvatarFallback>
                                {post.author.substring(0, 1)}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1">
                                <span className="font-medium">{post.author}</span>
                                <Badge
                                    variant="secondary"
                                    className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 rounded-full"
                                >
                                    {post.authorLevel}
                                </Badge>
                            </div>
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                                Patrocinado
                            </Badge>
                        </div>

                        <div className="flex flex-row gap-2">
                            <div className="flex justify-center items-center w-6 h-6 bg-gray-600 rounded-full p-1">
                                <Avatar>
                                    <AvatarImage src="/icons/icon-profile.png" />
                                    <AvatarFallback>
                                        {post.communityName.substring(0, 1)}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <span className="truncate">{post.communityName}</span>
                            <span>•</span>
                            <span>{post.time}</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="h-full flex flex-col justify-between px-1 pt-0">
                <p className={`text-slate-300 leading-relaxed ${post.image ? "line-clamp-2" : ""}`}>{post.content}</p>
                {post.image && (
                    <div className="mb-3 rounded-xl overflow-hidden">
                        <Image
                            src={"/images/bg-not-found.png"}
                            alt="Post"
                            height={128}
                            width={512}
                            className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={`text-slate-300 hover:text-white-100 gap-1 px-1 ${post.likes ? "text-red-400" : ""
                                    }`}
                            >
                                <Heart className={`w-4 h-4 ${post.likes ? "fill-current" : ""}`} />
                                <span className="text-sm">{post.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white-100 gap-1 px-1">
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-sm">{post.comments}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white-100 gap-1 px-1">
                                <Share2 className="w-4 h-4" />
                                <span className="text-sm">{post.shares}</span>
                            </Button>
                        </div>
                        <Badge className="h-5 bg-purple-600/20 text-purple-400 border-purple-500/30 rounded-full">
                            <Lock className="w-4 h-4" />
                            <span>Premium</span>
                        </Badge>
                    </div>
                    <div className="space-y-2 mb-3">
                        {post.previewComments.slice(0, 2).map((comment: { author: string, content: string }, commentIndex: number) => (
                            <div key={commentIndex} className="text-xs">
                                <span className="font-medium text-slate-300">{comment.author}:</span>
                                <span className="text-slate-400 ml-1">{comment.content}</span>
                            </div>
                        ))}
                        {post.previewComments.length > 2 && (
                            <Button
                                variant="link"
                                size="sm"
                                className="text-xs text-purple-400 hover:text-purple-300 transition-colors p-0 h-0"
                            >
                                Ver más comentarios...
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-gray-800/50 hover:bg-gray-700/50 border-gray-700 text-xs cursor-pointer"
                >
                    Ver más
                </Button>
            </CardFooter>
        </Card>
    )
}

export default PostCard;