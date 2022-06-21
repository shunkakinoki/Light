/* eslint-disable no-restricted-imports */

import { z } from "zod";

import { poapActionsSchema } from "../poap/actions";
import { snapshotVotesSchema } from "../snapshot/votes";

export const networkRawQuerySchema = z.object({
  address: z.string(),
});

export const networkRawSchema = z.object({
  poap: poapActionsSchema.nullable(),
  snapshot: z.object({ data: snapshotVotesSchema.nullable() }),
});

export type NetworkRaw = z.infer<typeof networkRawSchema>;
