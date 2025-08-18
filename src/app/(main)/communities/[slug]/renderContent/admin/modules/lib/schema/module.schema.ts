import { z } from "zod";
import {
  DESCRIPTION_LENGTH,
  NAME_LENGTH,
  ROLES_LENGTH,
} from "../constants/module.constants";

export const moduleSchema = z.object({
  name: z
    .string()
    .min(
      NAME_LENGTH.MIN,
      `El nombre debe tener al menos ${NAME_LENGTH.MIN} caracteres.`
    )
    .max(
      NAME_LENGTH.MAX,
      `El nombre no puede exceder los ${NAME_LENGTH.MAX} caracteres.`
    ),
  description: z
    .string()
    .min(
      DESCRIPTION_LENGTH.MIN,
      `La descripción debe tener al menos ${DESCRIPTION_LENGTH.MIN} caracteres.`
    )
    .max(
      DESCRIPTION_LENGTH.MAX,
      `La descripción no puede exceder los ${DESCRIPTION_LENGTH.MAX} caracteres.`
    ),
  role_required: z
    .array(z.string().min(1, "El rol no puede estar vacío."))
    .min(ROLES_LENGTH.MIN, "Debe seleccionar al menos un rol.")
    .max(
      ROLES_LENGTH.MAX,
      `Debe seleccionar como máximo ${ROLES_LENGTH.MAX} roles.`
    ),
  banner: z
    .string()
    .min(1, "El banner es obligatorio.")
    .startsWith(
      "data:image/",
      "El banner debe ser una cadena de base64 con formato de imagen válido."
    ),
  is_active: z.boolean(),
});

export type CreateModuleForm = z.infer<typeof moduleSchema>;
