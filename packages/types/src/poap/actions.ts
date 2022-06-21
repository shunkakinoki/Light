import { z } from "zod";

import { poapBaseEventSchema } from "./base";

export const poapActionsQuerySchema = z.object({
  address: z.string(),
});

export const poapActionEventSchema = poapBaseEventSchema.merge(
  z.object({
    supply: z.number(),
  }),
);

export const poapActionSchema = z.object({
  event: poapActionEventSchema,
  tokenId: z.string(),
  owner: z.string(),
  chain: z.string(),
  created: z.string(),
});

export const poapActionsSchema = z.array(poapActionSchema);

export type PoapAction = z.infer<typeof poapActionSchema>;
export type PoapActions = z.infer<typeof poapActionsSchema>;
