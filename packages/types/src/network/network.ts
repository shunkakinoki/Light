import { networkSchema as network } from "@lightdotso/prisma";
import { z } from "zod";

export const networkQuerySchema = z.object({
  address: z.string(),
});

export const networkTypeSchema = network.pick({ type: true });

export const networkSchema = networkTypeSchema.merge(
  z.object({
    name: z.string(),
    id: z.string(),
    src: z.string(),
    count: z.number(),
  }),
);

export type NetworkTypeEnum = z.infer<typeof networkTypeSchema>;
export type NetworkType = NetworkTypeEnum["type"] | "ALL";
export type Network = z.infer<typeof networkSchema>;
