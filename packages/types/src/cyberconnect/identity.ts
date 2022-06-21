import { z } from "zod";

export const cyberconnectIdentityQuerySchema = z.object({
  address: z.string(),
});

export const cyberconnectIdentitySchema = z.object({
  identity: z.object({
    address: z.string(),
    avatar: z.string(),
    domain: z.string(),
    followingCount: z.number(),
    followerCount: z.number(),
    social: z.object({
      twitter: z.string(),
    }),
  }),
});

export type CyberConnectIdentity = z.infer<typeof cyberconnectIdentitySchema>;
