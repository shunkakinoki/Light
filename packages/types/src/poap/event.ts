import { z } from "zod";

import { poapBaseEventSchema } from "./base";

export const poapEventIdQuerySchema = z.object({
  eventId: z.string(),
});

export const poapEventIdSchema = poapBaseEventSchema.merge(
  z.object({
    from_admin: z.boolean(),
    virtual_event: z.boolean(),
    event_template_id: z.number(),
    event_host_id: z.number(),
    private_event: z.boolean(),
  }),
);

export type PoapEvent = z.infer<typeof poapEventIdSchema>;
