import { motion } from "framer-motion"
import { Role } from "../../types/role.type"
import { Edit, MoreHorizontal, Trash2, UserCog } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import CardHito from "./CardHito"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ROLE_ICONS } from "../../lib/constants/role.constants"

interface CardRoleProps {
    role: Role
    onEdit: (role: Role) => void
    onDelete: (role: Role) => void
}


const CardRole = ({ role, onEdit, onDelete }: CardRoleProps) => {
    const SelectedIcon = role.icon && ROLE_ICONS.find(item => item.value === role.icon)?.icon;
    return (
        <div className="grid gap-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50"
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`w-8 h-8 rounded-full bg-${role.color}-500 flex items-center justify-center`}>
                                {SelectedIcon ? <SelectedIcon className="h-4 w-4 text-white" /> : <UserCog className="h-4 w-4 text-white" />}

                            </div>
                            <h3 className="text-xl font-semibold text-white">{role.role_name}</h3>
                            <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">{role.members == 0 ? 'Sin ' : role.members} Miembros</Badge>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">{role.description}</p>

                        {role.requirement_json?.hitos && role.requirement_json.hitos.length > 0 && (
                            <div>
                                <h4 className="text-white font-medium mb-2">Requisitos:</h4>
                                <div className="space-y-2">
                                    {role.requirement_json.hitos.map((hito, index) =>
                                        <CardHito key={index} hito={hito} />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => onEdit(role)} className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl"
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => {
                                        onDelete(role)

                                    }}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Elimnar Rol
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default CardRole