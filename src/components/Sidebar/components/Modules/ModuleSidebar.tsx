"use client"
import { Button } from "@/components/ui/button"
import { Play, FileText, CheckCircle } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const lessons = [
    {
        id: 1,
        title: "Introducción al curso",
        duration: "5:30",
        completed: true,
        type: "video",
    },
    {
        id: 2,
        title: "Conceptos básicos",
        duration: "12:45",
        completed: true,
        type: "video",
    },
    {
        id: 3,
        title: "Práctica guiada",
        duration: "18:20",
        completed: false,
        type: "video",
    },
    {
        id: 4,
        title: "Recursos adicionales",
        duration: "3:15",
        completed: false,
        type: "document",
    },
]

const ModuleSidebar = () => {
    const { open } = useSidebar()

    if (!open) {
        return null
    }

    return (
        <div className="w-80 min-h-screen border-l border-gray-500 bg-gray-900/90 flex flex-col">
            <div className="p-4 border-b border-gray-500">
                <Tabs className="w-full">
                    <TabsList className="grid w-full grid-cols-3 rounded-2xl p-1 bg-gray-800/50">
                        <TabsTrigger
                            value="contenido"
                            className="rounded-xl data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
                        >
                            Contenido
                        </TabsTrigger>
                        <TabsTrigger
                            value="chat"
                            className="rounded-xl data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
                        >
                            Chat Live
                        </TabsTrigger>
                        <TabsTrigger
                            value="adjuntos"
                            className="rounded-xl data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
                        >
                            Adjuntos
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="flex-1 p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Lecciones</h3>
                <div className="space-y-2">
                    {lessons.map((lesson) => (
                        <Button
                            key={lesson.id}
                            variant={lesson.id === 3 ? "secondary" : "ghost"}
                            className="w-full justify-start h-auto p-3"
                            asChild
                        >
                            <a href={`#lesson-${lesson.id}`} className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    {lesson.type === "video" ? <Play className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                                    {lesson.completed && <CheckCircle className="h-3 w-3 text-green-500" />}
                                </div>
                                <div className="flex-1 min-w-0 text-left">
                                    <div className="text-sm font-medium truncate">{lesson.title}</div>
                                    <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                                </div>
                            </a>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ModuleSidebar;