import { z } from "zod";

export const cyberconnectFollowersQuerySchema = z.object({
  address: z.string(),
  first: z.string().optional(),
  after: z.string().optional(),
});

export const cyberconnectFollowersSchema = z.object({
  identity: z.object({
    followers: z.object({
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

export type CyberConnectFollowers = z.infer<typeof cyberconnectFollowersSchema>;
