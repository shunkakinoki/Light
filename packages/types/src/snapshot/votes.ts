import { z } from "zod";

import { snapshotProposalObjectSchema } from "./proposal";
import { snapshotSpaceObjectSchema } from "./space";

export const snapshotVotesQuerySchema = z.object({
  address: z.string(),
});

export const snapshotVoteSchema = z.object({
  id: z.string(),
  ipfs: z.string(),
  voter: z.string().nullable(),
  created: z.number(),
  space: snapshotSpaceObjectSchema,
  proposal: snapshotProposalObjectSchema,
  choice: z.any(),
  metadata: z.any(),
  vp: z.number(),
  vp_by_strategy: z.array(z.number()),
  vp_state: z.string(),
});

export const snapshotVotesSchema = z.object({
  votes: z.array(snapshotVoteSchema),
});

export type SnapshotVote = z.infer<typeof snapshotVoteSchema>;
export type SnapshotVotes = z.infer<typeof snapshotVotesSchema>;
