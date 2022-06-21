import { z } from "zod";

export const cyberconnectPopularQuerySchema = z.object({
  address: z.string(),
  first: z.string().optional(),
  after: z.string().optional(),
});

export const cyberconnectPopularSchema = z.object({
  popular: z.object({
    pageInfo: z.object({ endCursor: z.string(), hasNextPage: z.boolean() }),
    list: z.array(
      z.object({
        address: z.string(),
        avatar: z.string(),
        domain: z.string(),
        followerCount: z.number(),
        recommendationReason: z.string(),
      }),
    ),
  }),
});

export type CyberConnectPopular = z.infer<typeof cyberconnectPopularSchema>;
