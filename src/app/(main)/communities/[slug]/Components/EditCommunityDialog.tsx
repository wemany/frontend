"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { FormFieldWrapper } from "@/app/(main)/profile/components/ui/FormFieldWrapper"
import ImageUpload from "@/app/(main)/profile/components/ImageUpload"
import { EditCommunityDialogProps } from "@/app/(main)/profile/types/community.types"
import { useFormEditCommunity } from "../hooks/useFormEditCommunity"

const EditCommunityDialog = ({ open, onOpenChange, communityData, onSave }: EditCommunityDialogProps) => {

    const { open: openModal, error, form, isLoading, handleClose, handleBannerChange, handleBannerRemove, handleLogoChange, handleLogoRemove, handleSave } = useFormEditCommunity({ open, communityData, onSave, onOpenChange })

    return (
        <Dialog open={openModal} onOpenChange={handleClose}>
            <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="border-b border-gray-700/50 pb-6">
                    <div className="space-y-1">
                        <DialogTitle className="text-2xl font-bold text-white">Editar Comunidad</DialogTitle>
                        <p className="text-slate-400">Modifica la información de tu comunidad</p>
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8 py-6">
                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-900/20 border border-red-500/30 rounded-xl p-4"
                            >
                                <p className="text-red-400 text-sm">{error}</p>
                            </motion.div>
                        )}

                        {/* Información Básica */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Información Básica</h3>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field, fieldState }) => (
                                            <FormFieldWrapper label="Nombre de la Comunidad" required>
                                                <Input
                                                    {...field}
                                                    placeholder="Ej: Academia de Marketing Digital"
                                                    className={cn(
                                                        "bg-gray-800/50 border-gray-700 text-white rounded-2xl transition-colors",
                                                        fieldState.error && fieldState.isTouched && "border-red-500 focus:border-red-500",
                                                    )}
                                                    disabled={isLoading}
                                                />
                                            </FormFieldWrapper>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field, fieldState }) => (
                                            <FormFieldWrapper label="Descripción" required>
                                                <Textarea
                                                    {...field}
                                                    placeholder="Describe de qué trata tu comunidad..."
                                                    className={cn(
                                                        "bg-gray-800/50 border-gray-700 text-white rounded-2xl min-h-[100px] transition-colors",
                                                        fieldState.error && fieldState.isTouched && "border-red-500 focus:border-red-500",
                                                    )}
                                                    disabled={isLoading}
                                                />
                                            </FormFieldWrapper>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Identidad Visual */}
                            <div className="space-y-6 border-t border-gray-700/50 pt-6">
                                <div className="space-y-6">
                                    <ImageUpload
                                        value={form.watch("banner")}
                                        onChange={handleBannerChange}
                                        onRemove={handleBannerRemove}
                                        label="Banner de la Comunidad"
                                        description="Imagen principal que aparecerá en la portada de tu comunidad (recomendado: 1200x400px)"
                                        aspectRatio="banner"
                                        maxSize={10}
                                    />

                                    <div className="space-y-3">
                                        <div className="flex flex-col items-center">
                                            <ImageUpload
                                                value={form.watch("logo")}
                                                onChange={handleLogoChange}
                                                onRemove={handleLogoRemove}
                                                label="Logo de la Comunidad"
                                                description="Imagen que representará tu comunidad (recomendado: 400x400px)"
                                                aspectRatio="square"
                                                maxSize={5}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-700/50">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handleClose}
                                disabled={isLoading}
                                className="text-slate-400 hover:text-white hover:bg-gray-800/50 rounded-xl px-6"
                            >
                                Cancelar
                            </Button>

                            <Button
                                type="submit"
                                disabled={isLoading || !form.formState.isValid}
                                className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-8 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Guardar Cambios
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditCommunityDialog;