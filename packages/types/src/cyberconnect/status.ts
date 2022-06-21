import { z } from "zod";

export const cyberconnectStatusQuerySchema = z.object({
  address: z.string(),
  to: z.string(),
});

export const cyberconnectStatusSchema = z.object({
  followStatus: z.object({
    isFollowed: z.boolean(),
    isFollowing: z.boolean(),
  }),
});

export type CyberConnectStatus = z.infer<typeof cyberconnectStatusSchema>;
