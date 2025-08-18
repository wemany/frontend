import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Link from "next/link";
import { Module } from "../../../admin/modules/types/module.type";
import Image from "next/image";
import { Role } from "../../../admin/roles/types/role.type";

const ModulesList = ({ modules, slug, roles }: { modules: Module[]; slug: string, roles: Role[] }) => {
    const memberRoleId = 'd3cbee5f-47a8-432f-9184-e31bafeb0292';
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module, index) => {
                const requiredRoles = roles.filter(role =>
                    module.role_required_id?.includes(role.role_id) && role.role_id !== memberRoleId
                );
                return ((
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                    >
                        {module.banner_url ? (
                            <>
                                <Image
                                    src={module.banner_url || "/placeholder.svg"}
                                    alt="Community Banner"
                                    fill
                                    className="object-cover opacity-30"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
                            </>
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-black"></div>
                        )}

                        <div className="relative p-6">
                            <div className="flex items-start justify-end mb-4">
                                {requiredRoles.length > 0 &&
                                    <Badge className={`bg-${requiredRoles[0].color}-500 text-shadow-gray-500 border-gray-600`}>{requiredRoles[0].role_name}</Badge>
                                }
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                {module.module_name}
                            </h3>
                            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{module.description}</p>

                            <Link
                                href={{
                                    pathname: `/communities/${slug}/modules/${module.id}`,
                                    query: { module_name: module.module_name }
                                }}
                                className=" h-1 w-full flex items-center justify-center p-6 bg-purple-600 hover:bg-purple-700 rounded-full group-hover:scale-105 transition-transform"
                            >
                                {module.is_active ? "Continuar Módulo" : "Comenzar Módulo"}
                            </Link>
                        </div>
                    </motion.div>
                ))
            })}
        </div>
    )
}

export default ModulesList;