import z from "zod"
import { HITOS_LENGTH } from "../constants/role.constants";

export const roleBasicInfoSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 carácteres").max(30, "Máximo 30 carácteres"),
    description: z.string().min(5, "La descripción debe tener al menos 5 carácteres").max(200, "Máximo 200 carácteres"),
    color: z.string().min(1, "Selecciona un color"),
    icon: z.string().min(1, "Selecciona un icono"),
});

export const roleHitoSchema = z.object({
    plugin: z.string().min(1, "Selecciona un plugin"),
    name: z.string().min(1, "Selecciona un hito"),
    operator: z.enum([">=", ">", "=", "<=", "<"]),
    value: z.number().min(0, "El valor debe ser mayor o igual a 0"),
})

export const roleHitosSchema = z.object({
    hitos: z.array(roleHitoSchema).min(HITOS_LENGTH.MIN, `Agrega al menos ${HITOS_LENGTH.MIN} hito`).max(HITOS_LENGTH.MAX, `Máximo ${HITOS_LENGTH.MAX} hitos`),
})


export const createRoleSchema = roleBasicInfoSchema.merge(roleHitosSchema)

export type CreateRoleForm = z.infer<typeof createRoleSchema>
export type RoleBasicInfo = z.infer<typeof roleBasicInfoSchema>
export type RoleHitoForm = z.infer<typeof roleHitoSchema>