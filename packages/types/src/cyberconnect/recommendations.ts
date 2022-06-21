import { z } from "zod";

export const cyberconnectRecommendationsQuerySchema = z.object({
  address: z.string(),
  first: z.string().optional(),
  after: z.string().optional(),
});

export const cyberconnectRecommendationsSchema = z.object({
  recommendations: z.object({
    data: z.object({
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
  }),
});

export type CyberConnectRecommendations = z.infer<
  typeof cyberconnectRecommendationsSchema
>;
