import { timelineSchema } from "@lightdotso/prisma";
import { z } from "zod";

import { cursorRegex } from "./cursor";

export const timelineSnapshotQuerySchema = timelineSchema
  .pick({ category: true })
  .partial()
  .merge(
    z.object({
      spaceId: z.string(),
      cursor: z.string().regex(cursorRegex).optional(),
    }),
  );
