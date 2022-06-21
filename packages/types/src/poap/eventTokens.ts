import { z } from "zod";

export const poapEventTokensQuerySchema = z.object({
  eventId: z.string(),
  offset: z.string().optional(),
  limit: z.string().optional(),
});

export const poapOwnerSchema = z.object({
  id: z.string(),
  tokensOwned: z.number(),
  ens: z.string().optional(),
});

export const poapEventTokenSchema = z.object({
  created: z.string(),
  id: z.string(),
  owner: poapOwnerSchema,
  transferCount: z.string(),
});

export const poapEventTokensSchema = z.object({
  limit: z.number(),
  offset: z.number(),
  total: z.number(),
  tokens: z.array(poapEventTokenSchema),
});

export type PoapEventToken = z.infer<typeof poapEventTokenSchema>;
export type PoapEventTokens = z.infer<typeof poapEventTokensSchema>;
