export const KEYWORD_SUGGESTIONS = [
  "marketing digital",
  "emprendimiento",
  "ventas online",
  "redes sociales",
  "e-commerce",
  "dropshipping",
  "afiliados",
  "copywriting",
  "publicidad",
  "negocios",
  "inversiones",
  "criptomonedas",
] as const;

export const COMMUNITY_STEPS = {
  BASIC_INFO: 1,
  TAGS: 2,
  PRICING: 3,
} as const;

export const MAX_STEPS = 3;

export const TAGS_LENGTH = {
  MIN: 3,
  MAX: 20,
} as const;

export const TITLE_LENGTH = {
  MIN: 3,
  MAX: 50,
} as const;

export const DESCRIPTION_LENGTH = {
  MIN: 10,
  MAX: 200,
} as const;

export const PLAN_LIMITS = {
  MIN_PLANS: 1,
  MAX_PLANS: 3,
} as const;

export const DURATION_UNITS = [
  { value: "none", label: "Sin duración" },
  { value: "day", label: "Día(s)" },
  { value: "week", label: "Semana(s)" },
  { value: "month", label: "Mes(es)" },
  { value: "year", label: "Año(s)" },
] as const;

export const DURATION_LIMITS = {
  none: { max: Infinity, default: 0 },
  day: { max: 30, default: 1 },
  week: { max: 4, default: 1 },
  month: { max: 12, default: 1 },
  year: { max: 5, default: 1 },
} as const;

export const DURATION_VALUE = {
  MIN: 0,
} as const;

export const FEATURES_LENGTH = {
  MIN: 1,
  MAX: 10,
} as const;

export const DURATION_UNITS_VALUES = DURATION_UNITS.map(
  (unit) => unit.value
) as [string, ...string[]];
