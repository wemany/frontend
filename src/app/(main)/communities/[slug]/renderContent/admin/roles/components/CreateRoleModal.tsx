"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRoleForm } from "../hooks/useRoleForm";
import { CreateRoleModalProps, RoleFormHandlers } from "../types/role.type";
import DialogForm from "./DialogForm";
import { useEffect, useMemo } from "react";
import { CreateRoleForm } from "../lib/schema/role.schema";

const CreateRoleModal = ({ open, roleToEdit, onOpenChange, onSubmit }: CreateRoleModalProps) => {

    const DEFAULT_VALUES: CreateRoleForm = useMemo(() => ({
        name: roleToEdit?.role_name || "",
        description: roleToEdit?.description || "",
        color: roleToEdit?.color || "",
        hitos: roleToEdit?.requirement_json?.hitos || [],
        icon: roleToEdit?.icon || "",
    }), [roleToEdit]);

    const {
        form,
        addHito,
        isFormValid,
        removeHito,
        updateHito,
    } = useRoleForm();
    const roleFormHandlers: RoleFormHandlers = {
        addHito,
        removeHito,
        updateHito,
    };

    useEffect(() => {
        if (roleToEdit) {
            form.reset(DEFAULT_VALUES);
        }
    }, [roleToEdit, form, DEFAULT_VALUES]);

    const handleSubmitRole = async () => {
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
                                {roleToEdit ? "Editar Rol" : "Crear Nuevo Rol"}
                            </DialogTitle>
                        </div>
                    </div>
                </DialogHeader>
                <DialogForm
                    form={form}
                    isFormValid={isFormValid}
                    roleFormHandlers={roleFormHandlers}
                    onSubmit={handleSubmitRole}
                    isEditing={!!roleToEdit}
                />
            </DialogContent>
        </Dialog>
    )

}

export default CreateRoleModal;