import { z } from "zod";

export const credentialsMessageSchema = z.object({
  domain: z.string(),
  address: z.string(),
  statement: z.string(),
  uri: z.string(),
  version: z.string(),
  chainId: z.number(),
  nonce: z.string(),
  issuedAt: z.string(),
});

export type CredentialsMessage = z.infer<typeof credentialsMessageSchema>;
