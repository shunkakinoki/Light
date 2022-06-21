import { z } from "zod";

export const cyberconnectRankingsQuerySchema = z.object({
  first: z.string().optional(),
  after: z.string().optional(),
});

export const cyberconnectRankingsSchema = z.object({
  rankings: z.object({
    pageInfo: z.object({ endCursor: z.string(), hasNextPage: z.boolean() }),
    list: z.array(
      z.object({
        address: z.string(),
        avatar: z.string(),
        domain: z.string(),
        followerCount: z.number(),
      }),
    ),
  }),
});

export type CyberConnectRankings = z.infer<typeof cyberconnectRankingsSchema>;
