import { z } from "zod";

export const rawContractSchema = z.object({
  value: z.string().nullable(),
  address: z.string().nullable(),
  decimal: z.string().nullable(),
});

export const alchemyTransferSchema = z.object({
  blockNum: z.string(),
  hash: z.string(),
  from: z.string(),
  to: z.string(),
  value: z.number().nullable(),
  erc721Id: z.any().nullable(),
  erc1155Metadata: z.any().nullable(),
  tokenId: z.any().nullable(),
  asset: z.string().nullable(),
  category: z.string(),
  rawContract: rawContractSchema,
});

export const alchemyResultSchema = z.object({
  transfers: z.array(alchemyTransferSchema),
});

export const alchemyTransactionsSchema = z.object({
  id: z.number(),
  result: alchemyResultSchema,
  jsonrpc: z.string(),
});

export const alchemyTransactionsQuerySchema = z.object({
  address: z.string(),
});

export type AlchemyTransfer = z.infer<typeof alchemyTransferSchema>;
export type AlchemyTransactions = z.infer<typeof alchemyTransactionsSchema>;
