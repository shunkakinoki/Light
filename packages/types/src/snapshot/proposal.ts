import { z } from "zod";

export const snapshotProposalObjectSchema = z.object({
  id: z.string().nullable(),
  ipfs: z.string(),
  author: z.string(),
  created: z.number().nullable(),
  network: z.string().nullable(),
  symbol: z.string().nullable(),
  type: z.string(),
  strategies: z.array(
    z.object({
      name: z.string(),
      params: z.any(),
      network: z.string(),
    }),
  ),
  plugins: z.any(),
  title: z.string().nullable(),
  body: z.string(),
  discussion: z.string().nullable(),
  choices: z.array(z.string()),
  start: z.number().nullable(),
  end: z.number().nullable(),
  quorum: z.number().nullable(),
  snapshot: z.string(),
  state: z.string(),
  link: z.string(),
  scores: z.array(z.number()),
  scores_by_strategy: z.any(),
  scores_state: z.string(),
  scores_total: z.number(),
  scores_updated: z.number(),
  votes: z.number(),
});

export type SnapshotProposal = z.infer<typeof snapshotProposalObjectSchema>;
