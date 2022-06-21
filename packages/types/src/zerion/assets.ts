import { z } from "zod";

export const zerionAssetSchema = z.object({
  asset_code: z.string(),
  decimals: z.number(),
  quantity: z.number(),
  icon_url: z.string(),
  is_displayable: z.boolean(),
  is_verified: z.boolean(),
  name: z.string(),
  price: z
    .object({
      changed_at: z.number(),
      relative_change_24h: z.number(),
      value: z.number(),
    })
    .nullable(),
  implementations: z.record(
    z.object({ address: z.string(), decimals: z.number() }),
  ),
  symbol: z.string(),
  type: z.string().nullable(),
});

export const zerionAssetsSchema = z.array(zerionAssetSchema);

export type ZerionAsset = z.infer<typeof zerionAssetSchema>;
export type ZerionAssets = z.infer<typeof zerionAssetsSchema>;
