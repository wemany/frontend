"use client"

import { useState } from "react"
import { Reply, MoreVertical, ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Lesson } from "@/lib/data"

interface Comment {
    id: string
    user: {
        name: string
        avatar: string
        isInstructor?: boolean
    }
    content: string
    timestamp: string
    likes: number
    dislikes: number
    replies: Comment[]
    isLiked?: boolean
    isDisliked?: boolean
}

interface CommentsSectionProps {
    lesson: Lesson
}

const mockComments: Comment[] = [
    {
        id: "1",
        user: {
            name: "Carlos Mendoza",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        content:
            "Excelente explicación sobre el e-commerce. Me ayudó mucho a entender los conceptos básicos. ¿Podrías hacer un video sobre marketing digital específicamente?",
        timestamp: "hace 2 horas",
        likes: 12,
        dislikes: 0,
        isLiked: true,
        replies: [
            {
                id: "1-1",
                user: {
                    name: "Instructor",
                    avatar: "/placeholder.svg?height=40&width=40",
                    isInstructor: true,
                },
                content:
                    "¡Gracias Carlos! Me alegra que te haya sido útil. Sí, tengo planeado hacer un módulo completo sobre marketing digital en las próximas semanas.",
                timestamp: "hace 1 hora",
                likes: 8,
                dislikes: 0,
                replies: [],
            },
        ],
    },
    {
        id: "2",
        user: {
            name: "Ana López",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        content:
            "Una pregunta: ¿es necesario tener conocimientos previos de programación para crear una tienda en Shopify?",
        timestamp: "hace 3 horas",
        likes: 5,
        dislikes: 0,
        replies: [],
    },
    {
        id: "3",
        user: {
            name: "Miguel Torres",
            avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "Muy buena clase. Los ejemplos prácticos son muy útiles. Esperando el siguiente módulo!",
        timestamp: "hace 4 horas",
        likes: 7,
        dislikes: 0,
        replies: [],
    },
]

export function CommentsSection({ lesson }: CommentsSectionProps) {
    const [comments, setComments] = useState<Comment[]>(mockComments)
    const [newComment, setNewComment] = useState("")
    const [replyingTo, setReplyingTo] = useState<string | null>(null)
    const [replyContent, setReplyContent] = useState("")

    console.log({ lesson });

    const handleSubmitComment = () => {
        if (newComment.trim()) {
            const comment: Comment = {
                id: Date.now().toString(),
                user: {
                    name: "Tú",
                    avatar: "/placeholder.svg?height=40&width=40",
                },
                content: newComment,
                timestamp: "ahora",
                likes: 0,
                dislikes: 0,
                replies: [],
            }
            setComments([comment, ...comments])
            setNewComment("")
        }
    }

    const handleSubmitReply = (parentId: string) => {
        if (replyContent.trim()) {
            const reply: Comment = {
                id: `${parentId}-${Date.now()}`,
                user: {
                    name: "Tú",
                    avatar: "/placeholder.svg?height=40&width=40",
                },
                content: replyContent,
                timestamp: "ahora",
                likes: 0,
                dislikes: 0,
                replies: [],
            }

            setComments(
                comments.map((comment) =>
                    comment.id === parentId ? { ...comment, replies: [...comment.replies, reply] } : comment,
                ),
            )
            setReplyContent("")
            setReplyingTo(null)
        }
    }

    const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
        <div className={`${isReply ? "ml-12" : ""}`}>
            <div className="flex gap-3">
                <Avatar className="w-10 h-10">
                    <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.user.name}</span>
                        {comment.user.isInstructor && (
                            <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded">Instructor</span>
                        )}
                        <span className="text-xs text-gray-400">{comment.timestamp}</span>
                    </div>

                    <p className="text-sm text-gray-200 mb-2">{comment.content}</p>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 text-xs ${comment.isLiked ? "text-blue-400" : "text-gray-400"}`}
                        >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {comment.likes}
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 text-xs ${comment.isDisliked ? "text-red-400" : "text-gray-400"}`}
                        >
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            {comment.dislikes > 0 ? comment.dislikes : ""}
                        </Button>

                        {!isReply && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs text-gray-400"
                                onClick={() => setReplyingTo(comment.id)}
                            >
                                <Reply className="h-3 w-3 mr-1" />
                                Responder
                            </Button>
                        )}

                        <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-400">
                            <MoreVertical className="h-3 w-3" />
                        </Button>
                    </div>

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                        <div className="mt-3 space-y-2">
                            <Textarea
                                placeholder="Escribe tu respuesta..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                className="bg-gray-800 border-gray-600 text-sm"
                                rows={2}
                            />
                            <div className="flex gap-2">
                                <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>
                                    Responder
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                        <div className="mt-4 space-y-4">
                            {comment.replies.map((reply) => (
                                <CommentItem key={reply.id} comment={reply} isReply />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

    return (
        <div className="pt-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Comentarios ({comments.length})</h3>

            {/* New Comment Form */}
            <div className="mb-6">
                <div className="flex gap-3">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src="/icons/icon-profile.png" />
                        <AvatarFallback>Tú</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                        <Textarea
                            placeholder="Añade un comentario público..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                            rows={3}
                        />
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => setNewComment("")} className="text-gray-400 hover:text-white">
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleSubmitComment}
                                disabled={!newComment.trim()}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                Comentar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>

            {/* Load More */}
            {comments.length > 0 && (
                <div className="text-center mt-6">
                    <Button variant="outline">Cargar más comentarios</Button>
                </div>
            )}
        </div>
    )
}
