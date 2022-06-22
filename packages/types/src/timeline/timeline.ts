import { timelineSchema } from "@lightdotso/prisma";
import { z } from "zod";

// eslint-disable-next-line no-restricted-imports
import { openseaAssetEventSchema } from "../opensea";
// eslint-disable-next-line no-restricted-imports
import { poapActionSchema } from "../poap";
// eslint-disable-next-line no-restricted-imports
import { snapshotVoteSchema } from "../snapshot";

export const timelineItemSchema = timelineSchema.merge(
  z.object({
    snapshot: snapshotVoteSchema.nullable(),
    poap: poapActionSchema.nullable(),
    opensea: openseaAssetEventSchema.nullable(),
  }),
);

export const timelineDataSchema = z.object({
  timeline: z.array(timelineItemSchema),
  cursor: z.string(),
  isEnd: z.boolean(),
});

export type TimelineItem = z.infer<typeof timelineItemSchema>;
export type TimelineData = z.infer<typeof timelineDataSchema>;
