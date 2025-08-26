import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateModuleModalProps } from "../types/module.type";
import { useForm } from "react-hook-form";
import { CreateModuleForm } from "../lib/schema/module.schema";
import DialogForm from "./DialogForm";
import { useEffect, useMemo } from "react";

const CreateModuleModal = ({ open, roles, moduleToEdit, onOpenChange, onSubmit }: CreateModuleModalProps) => {

    const DEFAULT_VALUES: CreateModuleForm = useMemo(() => ({
        name: moduleToEdit?.module_name || "",
        description: moduleToEdit?.description || "",
        banner: moduleToEdit?.banner_url || "",
        role_required: moduleToEdit?.role_required_id || [],
        is_active: moduleToEdit?.is_active || false,
    }), [moduleToEdit]);

    const form = useForm({
        defaultValues: DEFAULT_VALUES
    })

    useEffect(() => {
        if (!open) {
            form.reset(DEFAULT_VALUES);
        }
    }, [open, form, DEFAULT_VALUES]);

    const handleSubmitModule = async () => {
        const isValid = await form.trigger();
        if (isValid) {
            const formData = form.getValues();
            await onSubmit(formData);
            form.reset();
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-gray-900 border-gray-700 overflow-y-auto sm:max-w-3xl max-h-[900px]">
                <DialogHeader className="border-b border-gray-700 pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle className="text-2xl font-bold text-white">
                                {moduleToEdit ? "Editar Módulo" : "Crear Nuevo Módulo"}
                            </DialogTitle>
                        </div>
                    </div>
                </DialogHeader>
                <DialogForm
                    form={form}
                    roles={roles}
                    onSubmit={handleSubmitModule}
                    isEditing={!!moduleToEdit}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreateModuleModal;