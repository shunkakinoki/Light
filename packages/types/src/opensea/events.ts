import { z } from "zod";

import {
  openseaAssetSchema,
  paymentTokenSchema,
  transactionSchema,
} from "./assets";
import { openseaEventTypeSchema } from "./event";
import { userSchema } from "./user";

export const openseaEventsQuerySchema = z.object({
  address: z.string(),
  cursor: z.string().optional(),
});

export const openseaAssetEventSchema = z.object({
  asset: openseaAssetSchema,
  asset_bundle: z.any().nullable(),
  event_type: openseaEventTypeSchema,
  event_timestamp: z.string(),
  auction_type: z.any().nullable(),
  total_price: z.string().nullable(),
  payment_token: paymentTokenSchema.nullable(),
  transaction: transactionSchema.nullable(),
  created_date: z.string(),
  quantity: z.string(),
  approved_account: z.any().nullable(),
  bid_amount: z.any().nullable(),
  collection_slug: z.string(),
  contract_address: z.string(),
  custom_event_name: z.any().nullable(),
  dev_fee_payment_event: z.any().nullable(),
  dev_seller_fee_basis_points: z.any().nullable(),
  duration: z.any().nullable(),
  ending_price: z.any().nullable(),
  from_account: userSchema.nullable(),
  id: z.number(),
  is_private: z.boolean().nullable(),
  owner_account: userSchema.nullable(),
  seller: userSchema.nullable(),
  starting_price: z.any().nullable(),
  to_account: userSchema.nullable(),
  winner_account: userSchema.nullable(),
  listing_time: z.string().nullable(),
});

export const openseaEventsSchema = z.object({
  next: z.string().nullable(),
  previous: z.string().nullable(),
  asset_events: z.array(openseaAssetEventSchema).nullable(),
});

export type OpenseaEvent = z.infer<typeof openseaAssetEventSchema>;
export type OpenseaEvents = z.infer<typeof openseaEventsSchema>;
