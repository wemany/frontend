import { z } from "zod"
import { DESCRIPTION_LENGTH, TAGS_LENGTH, PLAN_LIMITS, TITLE_LENGTH } from "../constants/community.constants"
import { createPlanSchema } from "@/app/(main)/communities/[slug]/renderContent/admin/plans/lib/schema/plan.schema"

export const communityBasicInfoSchema = z.object({
    name: z
        .string()
        .min(TITLE_LENGTH.MIN, `El nombre debe tener al menos ${TITLE_LENGTH.MIN} caracteres`)
        .max(TITLE_LENGTH.MAX, `El nombre no puede exceder ${TITLE_LENGTH.MAX} caracteres`),
    description: z
        .string()
        .min(DESCRIPTION_LENGTH.MIN, `La descripción debe tener al menos ${DESCRIPTION_LENGTH.MIN} caracteres`)
        .max(DESCRIPTION_LENGTH.MAX, `La descripción no puede exceder ${DESCRIPTION_LENGTH.MAX} caracteres`),
    category: z.string().min(1, "Selecciona una categoría"),
    language: z.string().min(1, "Selecciona un idioma"),
    type: z.enum(["public", "private"]),
    isPublic: z.boolean(),
    banner: z.string().min(1, "El banner es obligatorio"),
    logo: z.string().min(1, "El logo es obligatorio"),
})

export const communityTagsSchema = z.object({
    tags: z.array(z.string()).min(TAGS_LENGTH.MIN, `Agrega al menos ${TAGS_LENGTH.MIN} etiquetas`).max(TAGS_LENGTH.MAX, `Máximo ${TAGS_LENGTH.MAX} etiquetas`),
    currentTag: z.string().optional(),
})

export const communityPricingSchema = z.object({
    plans: z
        .array(createPlanSchema)
        .min(PLAN_LIMITS.MIN_PLANS, `Agrega al menos ${PLAN_LIMITS.MIN_PLANS} plan`)
        .max(PLAN_LIMITS.MAX_PLANS, `Máximo ${PLAN_LIMITS.MAX_PLANS} planes permitidos`),
})

export const editCommunitySchema = z.object({
    name: z
        .string()
        .min(TITLE_LENGTH.MIN, `El nombre debe tener al menos ${TITLE_LENGTH.MIN} caracteres`)
        .max(TITLE_LENGTH.MAX, `El nombre no puede exceder ${TITLE_LENGTH.MAX} caracteres`),
    description: z
        .string()
        .min(DESCRIPTION_LENGTH.MIN, `La descripción debe tener al menos ${DESCRIPTION_LENGTH.MIN} caracteres`)
        .max(DESCRIPTION_LENGTH.MAX, `La descripción no puede exceder ${DESCRIPTION_LENGTH.MAX} caracteres`),
    banner: z.string().optional(),
    logo: z.string().optional(),
})

export const createCommunitySchema = communityBasicInfoSchema
    .merge(communityTagsSchema)
    .merge(communityPricingSchema)

export type CommunityBasicInfo = z.infer<typeof communityBasicInfoSchema>
export type CommunityTags = z.infer<typeof communityTagsSchema>
export type CommunityPricing = z.infer<typeof communityPricingSchema>
export type CreateCommunityForm = z.infer<typeof createCommunitySchema>
export type EditCommunityForm = z.infer<typeof editCommunitySchema>
