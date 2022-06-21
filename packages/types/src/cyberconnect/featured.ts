import { z } from "zod";

export const cyberconnectFeaturedQuerySchema = z.object({
  address: z.string(),
});

export const cyberconnectFeaturedSchema = z.object({
  featured: z.array(
    z.object({
      address: z.string(),
      followerCount: z.number(),
      recommendationReason: z.string(),
    }),
  ),
});

export type CyberConnectFeatured = z.infer<typeof cyberconnectFeaturedSchema>;
