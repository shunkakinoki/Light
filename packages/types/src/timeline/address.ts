import { timelineSchema } from "@lightdotso/prisma";
import { z } from "zod";

import { cursorRegex } from "./cursor";

export const timelineQuerySchema = timelineSchema
  .pick({ category: true })
  .partial()
  .merge(
    z.object({
      address: z.string(),
      cursor: z.string().regex(cursorRegex).optional(),
    }),
  );
