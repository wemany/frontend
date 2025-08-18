import { Button } from "@/components/ui/button"
import { BookOpen, PlayCircle, Star } from "lucide-react"

interface HeroSectionProps {
    title: string,
    description: string,

}

const HeroSection = ({ title, description }: HeroSectionProps) => {
    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
            <div className="relative">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                            <BookOpen className="h-10 w-10" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
                            <p className="text-slate-300 mb-4">{description}</p>
                            <div className="flex items-center gap-6 text-sm text-slate-400">
                                <span className="flex items-center gap-1">
                                    <PlayCircle className="h-4 w-4" />
                                    n videos
                                </span>
                                <span className="flex items-center gap-1">
                                    <Star className="h-4 w-4" />
                                    n.n rating
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => console.log("Upload Video")}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl"
                        >
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Subir Video
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;