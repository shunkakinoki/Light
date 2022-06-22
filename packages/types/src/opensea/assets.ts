import { z } from "zod";

import { openseaEventTypeSchema } from "./event";
import { userSchema } from "./user";

const assetContractSchema = z.object({
  address: z.string(),
  asset_contract_type: z.string(),
  created_date: z.string(),
  name: z.string(),
  nft_version: z.string().nullable(),
  opensea_version: z.any().nullable(),
  owner: z.number().nullable(),
  schema_name: z.string(),
  symbol: z.string(),
  total_supply: z.string().nullable(),
  description: z.string().nullable(),
  external_link: z.string().nullable(),
  image_url: z.string().nullable(),
  default_to_fiat: z.boolean(),
  dev_buyer_fee_basis_points: z.number(),
  dev_seller_fee_basis_points: z.number(),
  only_proxied_transfers: z.boolean(),
  opensea_buyer_fee_basis_points: z.number(),
  opensea_seller_fee_basis_points: z.number(),
  buyer_fee_basis_points: z.number(),
  seller_fee_basis_points: z.number(),
  payout_address: z.string().nullable(),
});

const displayDataSchema = z.object({
  card_display_style: z.string(),
  images: z.array(z.any()).nullable().optional(),
});

const collectionSchema = z.object({
  banner_image_url: z.any().nullable(),
  chat_url: z.any().nullable(),
  created_date: z.string(),
  default_to_fiat: z.boolean(),
  description: z.string().nullable(),
  dev_buyer_fee_basis_points: z.string(),
  dev_seller_fee_basis_points: z.string(),
  discord_url: z.any().nullable(),
  display_data: displayDataSchema.nullable(),
  external_url: z.string().nullable(),
  featured: z.boolean(),
  featured_image_url: z.any().nullable(),
  hidden: z.boolean(),
  safelist_request_status: z.string(),
  image_url: z.string().nullable(),
  is_subject_to_whitelist: z.boolean(),
  large_image_url: z.string().nullable(),
  medium_username: z.any().nullable(),
  name: z.string(),
  only_proxied_transfers: z.boolean(),
  opensea_buyer_fee_basis_points: z.string(),
  opensea_seller_fee_basis_points: z.string(),
  payout_address: z.string().nullable(),
  require_email: z.boolean(),
  short_description: z.any().nullable(),
  slug: z.string(),
  telegram_url: z.any().nullable(),
  twitter_username: z.any().nullable(),
  instagram_username: z.any().nullable(),
  wiki_url: z.any().nullable(),
});

const traitSchema = z.object({
  trait_type: z.string(),
  value: z.union([z.string(), z.number()]),
  display_type: z.any().nullable(),
  max_value: z.any().nullable(),
  trait_count: z.number(),
  order: z.any().nullable(),
});

const assetSchema = z.object({
  token_id: z.string(),
  decimals: z.number().nullable(),
});

export const paymentTokenSchema = z.object({
  id: z.number().nullable().optional(),
  symbol: z.string(),
  address: z.string(),
  image_url: z.string(),
  name: z.string(),
  decimals: z.number(),
  eth_price: z.string(),
  usd_price: z.string(),
});

export const transactionSchema = z.object({
  block_hash: z.string(),
  block_number: z.string(),
  from_account: userSchema.nullable(),
  id: z.number(),
  timestamp: z.string(),
  to_account: userSchema.nullable(),
  transaction_hash: z.string(),
  transaction_index: z.string(),
});

const lastSaleSchema = z.object({
  asset: assetSchema.nullable(),
  asset_bundle: z.any().nullable(),
  event_type: openseaEventTypeSchema,
  event_timestamp: z.string(),
  auction_type: z.any().nullable(),
  total_price: z.string().nullable(),
  payment_token: paymentTokenSchema.nullable(),
  transaction: transactionSchema.nullable(),
  created_date: z.string(),
  quantity: z.string(),
});

export const openseaAssetSchema = z.object({
  id: z.number(),
  token_id: z.string(),
  num_sales: z.number(),
  background_color: z.any().nullable(),
  image_url: z.string().nullable(),
  image_preview_url: z.string().nullable(),
  image_thumbnail_url: z.string().nullable(),
  image_original_url: z.string().nullable(),
  animation_url: z.string().nullable(),
  animation_original_url: z.string().nullable(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  external_link: z.any().nullable(),
  asset_contract: assetContractSchema,
  permalink: z.string(),
  collection: collectionSchema,
  decimals: z.number().nullable(),
  token_metadata: z.string().nullable(),
  owner: userSchema.nullable(),
  sell_orders: z.any().nullable(),
  creator: userSchema.nullable().optional(),
  traits: z.array(traitSchema).nullable().optional(),
  last_sale: lastSaleSchema.nullable().optional(),
  top_bid: z.any().nullable(),
  listing_date: z.any().nullable(),
  is_presale: z.boolean().nullable().optional(),
  transfer_fee_payment_token: z.any().nullable(),
  transfer_fee: z.any().nullable(),
});

export const openseaAssetQuerySchema = z.object({
  address: z.string(),
  tokenId: z.string(),
});

export const openseaAssetsQuerySchema = z.object({
  address: z.string(),
});

export const openseaAssetsSchema = z.object({
  assets: z.array(openseaAssetSchema).nullable(),
});

export type OpenseaAsset = z.infer<typeof openseaAssetSchema>;
export type OpenseaAssets = z.infer<typeof openseaAssetsSchema>;
