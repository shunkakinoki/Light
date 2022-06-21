import { z } from "zod";

export const snapshotVotersQuerySchema = z.object({
  spaceId: z.string(),
  first: z.string().optional(),
  skip: z.string().optional(),
});

export const snapshotVotersSchema = z.object({
  votes: z.array(
    z.object({
      voter: z.string(),
    }),
  ),
});

export type SnapshotVoters = z.infer<typeof snapshotVotersSchema>;
