"use client"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Module } from "../../types/module.type";
import Image from "next/image";
import { Edit, GripVertical, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Role } from "../../../roles/types/role.type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface CardModuleProps {
    slug: string;
    module: Module;
    roles: Role[];
    isDragging?: boolean;
    onDelete: (module: Module) => void;
    onEdit: (module: Module) => void;
}

const CardModule = ({ slug, module, roles, isDragging = false, onDelete, onEdit }: CardModuleProps) => {
    const requiredRoles = roles.filter(role => module.role_required_id.includes(role.role_id));

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging: isSortableDragging,
    } = useSortable({
        id: module.id,
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isSortableDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`overflow-hidden rounded-2xl bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors cursor-grab active:cursor-grabbing ${isDragging || isSortableDragging ? "shadow-lg scale-105" : "hover:shadow-md"}`}>

            <div className="p-6 flex items-start gap-4">
                <div
                    className="p-2 cursor-grab active:cursor-grabbing text-gray-500 hover:text-white transition-colors">
                    <GripVertical className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0 flex items-start gap-4">
                    {module.banner_url && (
                        <div className="relative w-32 h-20 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                                src={module.banner_url}
                                alt={`Banner de ${module.module_name}`}
                                layout="fill"
                                className="obcject-cover"
                            />
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        {/* Nombre del Módulo */}
                        <h3 className="text-xl font-bold text-white truncate">
                            {module.module_name}
                        </h3>

                        {/* Descripción del Módulo */}
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                            {module.description}
                        </p>

                        {/* Roles Requeridos */}
                        {requiredRoles.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                                {requiredRoles.map((role) => (
                                    <Badge
                                        key={role.role_id}
                                        className={`bg-${role.color}-500 text-white font-medium`}
                                    >
                                        {role.role_name}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Botón para ver Módulo */}
                <div className="flex flex-col justify-between items-end h-[100px] gap-2">
                    <div className="flex items-center gap-2">

                        <Badge className={cn(
                            "px-4 py-2 rounded-2xl",
                            module.is_active ? "bg-green-600/20 text-green-400 border-green-500/30" : "bg-red-600/20 text-red-400 border-red-500/30"
                        )}>
                            {module.is_active ? 'Activo' : 'Inactivo'}
                        </Badge>

                        <div onPointerDown={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-800" align="end">
                                    <DropdownMenuItem
                                        onClick={() => onEdit(module)}
                                        className="hover:cursor-pointer hover:text-purple-300 hover:bg-purple-700"
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Editar Módulo
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            onDelete(module)

                                        }}
                                        className="hover:cursor-pointer hover:text-red-300 hover:bg-red-500/10"
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Eliminar Módulo
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div onPointerDown={(e) => e.stopPropagation()}>
                        <Link href={`/communities/${slug}/modules/${module.id}`}>
                            <Button
                                variant="secondary"
                                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-2xl px-4 py-2 flex items-center gap-1"
                            >
                                Ver
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardModule;