import { z } from "zod";

export const paramSchema = z.object({
  name: z.string(),
  type: z.string(),
  indexed: z.boolean(),
  decoded: z.boolean(),
  value: z.any(),
});

export const paginationSchema = z.object({
  has_more: z.boolean(),
  page_number: z.number(),
  page_size: z.number(),
  total_count: z.any(),
});

export const decodedSchema = z.object({
  name: z.string(),
  signature: z.string(),
  params: z.array(paramSchema).nullable(),
});

export const logEventSchema = z.object({
  block_signed_at: z.string(),
  block_height: z.number(),
  tx_offset: z.number(),
  log_offset: z.number(),
  tx_hash: z.string(),
  raw_log_topics: z.array(z.string()),
  sender_contract_decimals: z.number(),
  sender_name: z.string().nullable(),
  sender_contract_ticker_symbol: z.string().nullable(),
  sender_address: z.string(),
  sender_address_label: z.string().nullable(),
  sender_logo_url: z.string(),
  raw_log_data: z.string().nullable(),
  decoded: decodedSchema.nullable(),
});

export const covalentTransactionSchema = z.object({
  block_signed_at: z.string(),
  block_height: z.number(),
  tx_hash: z.string(),
  tx_offset: z.number(),
  successful: z.boolean(),
  from_address: z.string(),
  from_address_label: z.string().nullable(),
  to_address: z.string(),
  to_address_label: z.string().nullable(),
  value: z.string(),
  value_quote: z.number(),
  gas_offered: z.number(),
  gas_spent: z.number(),
  gas_price: z.number(),
  fees_paid: z.string(),
  gas_quote: z.number(),
  gas_quote_rate: z.number(),
  log_events: z.array(logEventSchema),
});

export const covalentTransactionsDataSchema = z.object({
  address: z.string(),
  updated_at: z.string(),
  next_update_at: z.string(),
  quote_currency: z.string(),
  chain_id: z.number(),
  items: z.array(covalentTransactionSchema),
  pagination: paginationSchema,
});

export const covalentTransactionsSchema = z.object({
  data: covalentTransactionsDataSchema,
  error: z.boolean(),
  error_message: z.any(),
  error_code: z.any(),
});

export const covalentTransactionsQuerySchema = z.object({
  address: z.string(),
});

export type CovalentTransaction = z.infer<typeof covalentTransactionSchema>;
export type CovalentTransactions = z.infer<typeof covalentTransactionsSchema>;
