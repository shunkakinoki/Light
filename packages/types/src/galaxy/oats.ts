import { z } from "zod";

export const galaxyOatsQuerySchema = z.object({
  address: z.string(),
});

export const galaxyOatsSchema = z.object({
  addressInfo: z.object({
    recentParticipation: z.object({
      list: z.array(
        z.object({
          campaign: z.object({
            id: z.string(),
            name: z.string(),
            thumbnail: z.string(),
          }),
        }),
      ),
    }),
  }),
});

export type GalaxyOats = z.infer<typeof galaxyOatsSchema>;
