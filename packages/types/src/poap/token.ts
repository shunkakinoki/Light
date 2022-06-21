import { z } from "zod";

import { poapBaseEventSchema } from "./base";

export const poapTokenQuerySchema = z.object({
  tokenId: z.string(),
});

export const poapTokenEventSchema = poapBaseEventSchema;

export const poapTokenSupplySchema = z.object({
  total: z.number(),
  order: z.number(),
});

export const poapTokenSchema = z.object({
  event: poapTokenEventSchema,
  tokenId: z.string(),
  owner: z.string(),
  layer: z.string(),
  supply: poapTokenSupplySchema.optional(),
});

export type PoapToken = z.infer<typeof poapTokenSchema>;
