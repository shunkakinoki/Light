import { timelineSchema } from "@lightdotso/prisma";
import { z } from "zod";

// eslint-disable-next-line no-restricted-imports
import { openseaAssetEventSchema } from "../opensea";
// eslint-disable-next-line no-restricted-imports
import { poapActionSchema } from "../poap";
// eslint-disable-next-line no-restricted-imports
import { snapshotVoteSchema } from "../snapshot";

export const timelineItemSchema = z.union([
  timelineSchema.omit({ category: true, type: true }).merge(
    z.object({
      data: snapshotVoteSchema,
      category: z.enum(["DAO"]),
      type: z.enum(["SNAPSHOT"]),
    }),
  ),
  timelineSchema.omit({ category: true, type: true }).merge(
    z.object({
      data: openseaAssetEventSchema,
      category: z.enum(["NFT"]),
      type: z.enum(["OPENSEA"]),
    }),
  ),
  timelineSchema.omit({ category: true, type: true }).merge(
    z.object({
      data: poapActionSchema,
      category: z.enum(["SOCIAL"]),
      type: z.enum(["POAP"]),
    }),
  ),
]);

export const timelineDataSchema = z.object({
  timeline: z.array(timelineItemSchema),
  cursor: z.string(),
  isEnd: z.boolean(),
});

export type TimelineItem = z.infer<typeof timelineItemSchema>;
export type TimelineData = z.infer<typeof timelineDataSchema>;
