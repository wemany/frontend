import { FormField } from "@/components/ui/form";
import { Role } from "../../../roles/types/role.type";
import { cn } from "@/lib/utils";
import { UserCog, X } from "lucide-react";
import { FormFieldWrapper } from "@/app/(main)/profile/components/ui/FormFieldWrapper";
import { ROLE_ICONS } from "../../../roles/lib/constants/role.constants";
import { PlanFieldProps } from "../../types/plan.type";
import { ROLES_LENGTH } from "../../../modules/lib/constants/module.constants";
import { Button } from "@/components/ui/button";

interface PlanRolesFieldProps {
    control: PlanFieldProps['control'];
    roles: Role[];
    selectedRoles: string[] | undefined;
}

const PlanRolesField = ({ control, roles, selectedRoles }: PlanRolesFieldProps) => {
    return (
        <FormField
            control={control}
            name="role"
            render={({ field, fieldState }) => {
                const rolesToDisplay = selectedRoles || [];
                const maxRoles = ROLES_LENGTH.MAX;
                const canAddRoles = rolesToDisplay.length < maxRoles;

                const addRole = (roleId: string) => {
                    if (canAddRoles && !rolesToDisplay.includes(roleId)) {
                        field.onChange([...rolesToDisplay, roleId]);
                    }
                };

                const removeRole = (roleId: string) => {
                    field.onChange(rolesToDisplay.filter((id: string) => id !== roleId));
                };

                const getRole = (roleId: string) => {
                    return roles.find(r => r.role_id === roleId);
                };

                return (
                    <FormFieldWrapper
                        label="Roles Requeridos"
                        description="Selecciona los roles que tendrán acceso a este módulo."
                        required={true}
                        error={fieldState.error?.message}
                    >
                        <div>
                            <div className="mb-4">
                                <p className="text-slate-400 text-sm mb-2">Roles Disponibles (click para agregar):</p>
                                <div className="flex flex-wrap gap-2">
                                    {roles.map((role) => {
                                        const SelectedIcon = role.icon && ROLE_ICONS.find(item => item.value === role.icon)?.icon;
                                        const isSelected = rolesToDisplay.includes(role.role_id);
                                        const isDisabled = !canAddRoles && !isSelected;

                                        return (
                                            <Button
                                                key={role.role_id}
                                                type="button"
                                                onClick={() => addRole(role.role_id)}
                                                disabled={isDisabled}
                                                className={cn(
                                                    `px-3 py-2 rounded-xl text-sm font-medium transition-all`,
                                                    isSelected || isDisabled
                                                        ? "opacity-50 cursor-not-allowed bg-gray-700 text-gray-400"
                                                        : `bg-${role.color}-500 text-white hover:scale-105 cursor-pointer`
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {SelectedIcon ? <SelectedIcon className="h-4 w-4 text-white" /> : <UserCog className="h-4 w-4 text-white" />}
                                                    <span>{role.role_name}</span>
                                                </div>
                                            </Button>
                                        )
                                    })}
                                </div>
                            </div>

                            {rolesToDisplay.length > 0 && (
                                <div>
                                    <p className="text-slate-400 text-sm mb-2">Roles Seleccionados:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {rolesToDisplay.map((roleId) => {
                                            const role = getRole(roleId);
                                            const SelectedIcon = role?.icon && ROLE_ICONS.find(item => item.value === role.icon)?.icon;
                                            return (
                                                <div
                                                    key={roleId}
                                                    className={cn(
                                                        `px-3 py-2 rounded-xl text-sm font-medium`,
                                                        role?.color ? `bg-${role.color}-500` : 'bg-gray-500',
                                                        `text-white flex items-center gap-2`
                                                    )}
                                                >
                                                    {SelectedIcon ? <SelectedIcon className="h-4 w-4 text-white" /> : <UserCog className="h-4 w-4 text-white" />}
                                                    <span>{role?.role_name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeRole(roleId)}
                                                        className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {!canAddRoles && (
                                        <p className="text-red-400 text-sm my-2">
                                            Has alcanzado el límite de {maxRoles} roles. Para agregar uno nuevo, elimina uno de los seleccionados.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </FormFieldWrapper>
                );
            }}
        />
    );
};

export default PlanRolesField;