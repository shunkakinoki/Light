import { z } from "zod";

export const galaxyCampaignQuerySchema = z.object({
  oatId: z.string(),
});

export const galaxyCampaignSchema = z.object({
  data: z.object({
    campaign: z.object({
      id: z.string(),
      name: z.string(),
      thumbnail: z.string(),
    }),
  }),
});

export type GalaxyCampaign = z.infer<typeof galaxyCampaignSchema>;
