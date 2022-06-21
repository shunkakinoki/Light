import { timelineSchema } from "@lightdotso/prisma";
import { z } from "zod";

import { cursorRegex } from "./cursor";

export const timelinePoapQuerySchema = timelineSchema
  .pick({ category: true })
  .partial()
  .merge(
    z.object({
      eventId: z.string(),
      cursor: z.string().regex(cursorRegex).optional(),
    }),
  );
