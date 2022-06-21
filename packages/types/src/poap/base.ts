import { z } from "zod";

export const poapBaseEventSchema = z.object({
  id: z.number(),
  fancy_id: z.string(),
  name: z.string(),
  event_url: z.string(),
  image_url: z.string(),
  country: z.string(),
  city: z.string(),
  description: z.string(),
  year: z.number(),
  start_date: z.string(),
  end_date: z.string(),
  expiry_date: z.string(),
});

export type PoapBaseEvent = z.infer<typeof poapBaseEventSchema>;
