import type { sessionSchema, userSchema } from "@lightdotso/prisma";
import type { z } from "zod";

export type Session = z.infer<typeof sessionSchema>;
export type User = z.infer<typeof userSchema>;
