import { z } from "zod";

const eventSchema = z.object({
  id: z.string(),
});

const poapSchema = z.object({
  event: eventSchema,
  id: z.string(),
});

const accountsEntitySchema = z.object({
  tokens: z.array(poapSchema).optional().nullable(),
  tokensOwned: z.string().nullable(),
});

export const poapAccountSchema = z.object({
  accounts: z.array(accountsEntitySchema).optional().nullable(),
});

export const poapAccountQuerySchema = z.object({
  address: z.string(),
});

export type PoapGraph = z.infer<typeof poapSchema>;
export type PoapAccountGraph = z.infer<typeof poapAccountSchema>;
