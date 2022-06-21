import { z } from "zod";

export const cyberconnectFollowingsQuerySchema = z.object({
  address: z.string(),
  first: z.string().optional(),
  after: z.string().optional(),
});

export const cyberconnectFollowingsSchema = z.object({
  identity: z.object({
    followings: z.object({
      pageInfo: z.object({ endCursor: z.string(), hasNextPage: z.boolean() }),
      list: z.array(
        z.object({
          address: z.string(),
          avatar: z.string(),
          domain: z.string(),
        }),
      ),
    }),
  }),
});

export type CyberConnectFollowings = z.infer<
  typeof cyberconnectFollowingsSchema
>;
