import { z } from "zod";

export const networkQuerySchema = z.object({
  address: z.string(),
});

export const networkTypeSchema = z.enum(["DAO", "POAP", "ALL"]);

export const networkSchema = z.object({
  name: z.string(),
  id: z.string(),
  src: z.string(),
  count: z.number(),
  type: networkTypeSchema,
});

export type NetworkType = z.infer<typeof networkTypeSchema>;
export type Network = z.infer<typeof networkSchema>;
