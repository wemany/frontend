import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Calendar, Award } from "lucide-react";

const QuickActionSection = ({ communitiesCount }: { communitiesCount: number }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-purple-500/50 to-purple-900/50 backdrop-blur-sm border border-purple-700/50">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-white">Comunidades</p>
                            <p className="text-2xl font-bold text-white">{communitiesCount}</p>
                        </div>
                        <Users className="h-8 w-8 text-white" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/50 to-blue-900/50 backdrop-blur-sm border border-blue-700/50">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-white">Módulos</p>
                            <p className="text-2xl font-bold text-white">28</p>
                        </div>
                        <BookOpen className="h-8 w-8 text-white" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/50 to-green-900/50 backdrop-blur-sm border border-green-700/50">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-white">Eventos</p>
                            <p className="text-2xl font-bold text-white">15</p>
                        </div>
                        <Calendar className="h-8 w-8 text-white" />
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/50 to-orange-900/50 backdrop-blur-sm border border-orange-700/50">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-white">Logros</p>
                            <p className="text-2xl font-bold text-white">47</p>
                        </div>
                        <Award className="h-8 w-8 text-white" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default QuickActionSection;