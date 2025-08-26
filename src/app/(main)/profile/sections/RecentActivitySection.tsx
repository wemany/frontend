import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sampleData } from "@/lib/data";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { MessageSquare, Heart, MessageCircle, Share2 } from "lucide-react";

const RecentActivitySection = () => {
    return (
        <Card className="border-gray-800">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Actividad Reciente
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {sampleData.posts.map((post) => (
                    <div key={post.id} className="border-b border-gray-800 pb-4 last:border-b-0">
                        <div className="flex items-start gap-3">
                            <Avatar className="flex items-center justify-center h-10 w-10 border-2 rounded-full border-purple-500"
                            // onClick={() => openUserProfile(post.username)}
                            >
                                <AvatarImage src={post.avatar} alt={post.author} className="w-full h-full rounded-full" />
                                <AvatarFallback>
                                    {post.author.substring(0, 1)}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span
                                        className="font-semibold cursor-pointer hover:text-purple-600 transition-colors"
                                    // onClick={() => openUserProfile(post.username)}
                                    >
                                        {post.author}
                                    </span>
                                    <span className="text-sm text-gray-500">{post.username}</span>
                                    <div className="flex gap-1">
                                        {post.badges.map((badge, index) => (
                                            <span key={index} className="text-sm">
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-400">{post.timestamp}</span>
                                </div>
                                <p className="text-gray-300 mb-2">{post.content}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                                        <Heart className="h-4 w-4" />
                                        {post.likes}
                                    </button>
                                    <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                                        <MessageCircle className="h-4 w-4" />
                                        {post.comments}
                                    </button>
                                    <button className="flex items-center gap-1 hover:text-green-500 transition-colors">
                                        <Share2 className="h-4 w-4" />
                                        {post.shares}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default RecentActivitySection;