import { Badge } from "@/components/ui/badge";
import { availableMilestones } from "@/lib/data";
import { HitoItem } from "../../types/role.type";

const CardHito = ({ hito }: { hito: HitoItem }) => {
    const hitoData = availableMilestones.find(
        (m) => m.plugin === hito.plugin && m.id === hito.name
    );

    return (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30">
            <div className="flex-1">
                <p className="text-white text-sm">{hitoData?.name}</p>
                <Badge className="bg-gray-600/20 text-gray-400 border-gray-500/30 rounded-2xl text-[10px]">{hitoData?.pluginName}</Badge>
            </div>
            <div className="flex items-center gap-2">
                <Badge className="bg-gray-600/20 text-gray-400 border-gray-500/30 text-xs">
                    {hito.operator}
                </Badge>
                <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/30 text-xs">
                    {hito.value}
                </Badge>
            </div>
        </div>
    )
}

export default CardHito