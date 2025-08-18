import { Form } from "@/components/ui/form";
import { ModalFormProps } from "../types/module.type";
import ModuleNameField from "./ui/ModuleNameField";
import ModuleDescriptionField from "./ui/ModuleDescriptionField";
import ModuleBannerField from "./ui/ModuleBannerField";
import ModuleRolesField from "./ui/ModuleRolesField";
import ModuleVisibleField from "./ui/ModuleVisibleField";
import { Button } from "@/components/ui/button";

const DialogForm = ({ form, roles, isEditing, onSubmit }: ModalFormProps) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                <ModuleNameField control={form.control} />
                <ModuleDescriptionField control={form.control} />
                <ModuleBannerField control={form.control} />
                <ModuleRolesField control={form.control} roles={roles} />
                <ModuleVisibleField control={form.control} />

                <Button
                    type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl">
                    {isEditing ? "Guardar Cambios" : "Crear Módulo"}
                </Button>
            </form>
        </Form>
    )
}

export default DialogForm;