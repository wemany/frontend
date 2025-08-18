import {
  TITLE_LENGTH,
  DESCRIPTION_LENGTH,
  DURATION_UNITS_VALUES,
  DURATION_VALUE,
  FEATURES_LENGTH,
} from "@/app/(main)/profile/lib/constants/community.constants";
import z from "zod";

export const createPlanSchema = z.object({
  name: z
    .string()
    .min(
      TITLE_LENGTH.MIN,
      `El nombre del plan debe tener al menos ${TITLE_LENGTH.MIN} caracteres`
    )
    .max(
      TITLE_LENGTH.MAX,
      `El nombre del plan no puede exceder ${TITLE_LENGTH.MAX} caracteres`
    ),
  description: z
    .string()
    .min(
      DESCRIPTION_LENGTH.MIN,
      `La descripción debe tener al menos ${DESCRIPTION_LENGTH.MIN} caracteres`
    )
    .max(
      DESCRIPTION_LENGTH.MAX,
      `La descripción no puede exceder ${DESCRIPTION_LENGTH.MAX} caracteres`
    ),
  color: z.string().min(1, "Selecciona un color"),
  price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
  rol: z.string().min(1, "Selecciona un rol").optional(),
  currency: z.string().min(1, "Selecciona una moneda"),
  duration_unit: z.enum(DURATION_UNITS_VALUES),
  duration_value: z
    .number()
    .min(
      DURATION_VALUE.MIN,
      `La duración debe ser mayor o igual a ${DURATION_VALUE.MIN}`
    ),
  is_recurring: z.boolean(),
  features: z
    .array(z.string())
    .min(
      FEATURES_LENGTH.MIN,
      `Agrega al menos ${FEATURES_LENGTH.MIN} característica`
    )
    .max(FEATURES_LENGTH.MAX, `Máximo ${FEATURES_LENGTH.MAX} características`),
});

export type CreatePlanForm = z.infer<typeof createPlanSchema>;
