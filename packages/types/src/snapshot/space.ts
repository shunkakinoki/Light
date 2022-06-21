import { z } from "zod";

export const snapshotSpaceQuerySchema = z.object({
  spaceId: z.string(),
});

export const snapshotSpaceObjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  private: z.boolean(),
  about: z.string(),
  avatar: z.string(),
  terms: z.string().nullable(),
  location: z.string().nullable(),
  website: z.string().nullable(),
  twitter: z.string().nullable(),
  github: z.string().nullable(),
  email: z.string().nullable(),
  network: z.string().nullable(),
  symbol: z.string(),
  skin: z.string().nullable(),
  domain: z.string().nullable(),
  strategies: z.array(
    z.object({
      name: z.string(),
      params: z.any(),
      network: z.string(),
    }),
  ),
  admins: z.array(z.string()),
  members: z.array(z.string()),
  filters: z.object({
    minScore: z.number(),
    onlyMembers: z.boolean(),
  }),
  plugins: z.any().nullable(),
  voting: z
    .object({
      delay: z.number().nullable(),
      period: z.number().nullable(),
      type: z.string().nullable(),
      quorum: z.number().nullable(),
      blind: z.boolean(),
      hideAbstain: z.boolean(),
    })
    .nullable(),
  categories: z.array(z.string()),
  validation: z.object({
    name: z.string(),
    network: z.string().nullable(),
    params: z.any(),
  }),
  followersCount: z.number(),
  proposalsCount: z.number(),
});

export const snapshotSpaceSchema = z.object({
  space: snapshotSpaceObjectSchema,
});

export type SnapshotSpace = z.infer<typeof snapshotSpaceSchema>;
