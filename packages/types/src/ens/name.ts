import { z } from "zod";

export const ensResolveNameQuerySchema = z.object({
  name: z.string(),
});

export const ensResolveNameSchema = z.object({
  domains: z.array(
    z.object({
      name: z.string(),
      resolvedAddress: z.object({
        id: z.string(),
      }),
    }),
  ),
});

export type EnsResolveName = z.infer<typeof ensResolveNameSchema>;
