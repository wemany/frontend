import { AnimatePresence, motion } from "framer-motion"
import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Module } from "../types/module.type";

interface DeleteModuleModalProps {
    showDeleteModuleModal: boolean;
    setShowDeleteModuleModal: React.Dispatch<React.SetStateAction<boolean>>;
    moduleToDelete: Module | null;
    setModuleToDelete: React.Dispatch<React.SetStateAction<Module | null>>;
    onConfirmDelete: () => Promise<void>;
}

const DeleteModuleModal = ({ showDeleteModuleModal, setShowDeleteModuleModal, moduleToDelete, setModuleToDelete, onConfirmDelete }: DeleteModuleModalProps) => {
    return (
        <AnimatePresence>
            {showDeleteModuleModal && moduleToDelete && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setShowDeleteModuleModal(false)}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gray-900 rounded-3xl border border-red-500/20 w-full max-w-md"
                    >
                        <div className="p-6 border-b border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-red-600/20 flex items-center justify-center">
                                    <Trash2 className="h-6 w-6 text-red-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Eliminar Módulo</h2>
                                    <p className="text-slate-400 text-sm">Esta acción no se puede deshacer</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="mb-6">
                                <p className="text-white mb-2">
                                    ¿Estás seguro de que quieres eliminar el módulo <strong>{moduleToDelete.module_name}</strong>?
                                </p>
                                <p className="text-slate-400 text-sm mb-4">
                                    Al eliminar este módulo, también se eliminarán todos los videos y recursos asociados a él.
                                </p>

                                <div className="p-4 rounded-xl bg-red-600/10 border border-red-500/20">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <X className="h-3 w-3 text-red-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-red-400 font-medium text-sm mb-1">Advertencia</h4>
                                            <ul className="text-red-300 text-xs space-y-1">
                                                <li>• Se perderá de forma permanente todo el contenido (videos, archivos, etc.) del módulo.</li>
                                                <li>• Los usuarios ya no podrán acceder a esta sección de la comunidad.</li>
                                                <li>• Esta acción es permanente y no se puede revertir.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={() => { setShowDeleteModuleModal(false); setModuleToDelete(null) }}
                                    variant="outline"
                                    className="bg-gray-800/50 hover:bg-gray-700/50 text-white border-gray-700 rounded-2xl flex-1"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={onConfirmDelete}
                                    className="bg-red-600 hover:bg-red-700 text-white rounded-2xl flex-1"
                                >
                                    Eliminar Módulo
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default DeleteModuleModal;