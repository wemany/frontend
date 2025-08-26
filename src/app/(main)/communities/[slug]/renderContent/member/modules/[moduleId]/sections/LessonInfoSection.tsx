import { Star, Bookmark, Share2, Download, CheckCircle, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Lesson } from "@/lib/data"

interface LessonInfoProps {
  lesson: Lesson
}

export function LessonInfo({ lesson }: LessonInfoProps) {
  return (
    <div className="space-y-4">
      {/* Title and Description */}
      <div>
        <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
        <p className="text-gray-400">{lesson.description}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span className="text-sm text-gray-400">Califica esta lección</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button className="bg-purple-600 hover:bg-purple-700">
          <CheckCircle className="h-4 w-4 mr-2" />
          Marcar como Completado
        </Button>

        <Button variant="outline" className="border-gray-600 bg-transparent">
          <Award className="h-4 w-4 mr-2" />
          +450 XP
        </Button>

        <div className="flex gap-2 ml-auto">
          <Button variant="ghost" size="icon">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex items-center gap-4 text-sm text-gray-400">
        <span>Duración: {lesson.duration}</span>
        <span>•</span>
        <span>Dificultad: Principiante</span>
        <span>•</span>
        <span>Idioma: Español</span>
      </div>
    </div>
  )
}
