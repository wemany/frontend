import { z } from "zod";

const communitySchema = z.object({
  id: z.string(),
  alias: z.string(),
  name: z.string(),
  expires_at: z.string().nullable(),
  is_expired: z.boolean().nullable(),
});

const communitiesSchema = z.record(z.string(), communitySchema);

export const loginResponseSchema = z.object({
  result: z.boolean(),
  message: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  communities: communitiesSchema,
});
