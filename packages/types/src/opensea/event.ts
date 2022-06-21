import { z } from "zod";

export const openseaEventTypeSchema = z.enum([
  "created",
  "successful",
  "cancelled",
  "bid_entered",
  "bid_withdrawn",
  "transfer",
  "offer_entered",
  "approve",
]);

export type OpenseaEventType = z.infer<typeof openseaEventTypeSchema>;
