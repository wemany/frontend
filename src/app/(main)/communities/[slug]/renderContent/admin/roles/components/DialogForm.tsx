import { Form } from "@/components/ui/form";
import { ModalFormProps } from "../types/role.type";
import RoleNameField from "./ui/RoleNameField";
import RoleDescriptionField from "./ui/RoleDescriptionField";
import RoleIconField from "./ui/RoleIconField";
import { Button } from "@/components/ui/button";
import RoleHitoField from "./ui/RoleHitoField";
import ColorSelectorField from "../../../../../../../../components/ColorSelectorField";

const DialogForm = ({ form, roleFormHandlers, isFormValid, onSubmit, isEditing }: ModalFormProps) => {

    const updateHito = (index: number, field: string, value: string | number) => {
        const currentMilestones = form.getValues("hitos") || []
        const updatedMilestones = [...currentMilestones]
        updatedMilestones[index] = { ...updatedMilestones[index], [field]: value }
        form.setValue("hitos", updatedMilestones, {
            shouldValidate: true,
            shouldTouch: true,
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                <RoleNameField control={form.control} />
                <ColorSelectorField control={form.control} name="color" />
                <RoleDescriptionField control={form.control} />
                <RoleIconField control={form.control} />
                <RoleHitoField control={form.control} onAddHito={roleFormHandlers.addHito} updateHito={updateHito} onRemoveHito={roleFormHandlers.removeHito} getHitosValues={() => form.getValues("hitos")}
                />

                <Button
                    disabled={!isFormValid()}
                    type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl">
                    {isEditing ? "Guardar Cambios" : "Crear Rol"}
                </Button>
            </form>
        </Form>
    )
}

export default DialogForm;