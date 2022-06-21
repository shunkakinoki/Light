import { z } from "zod";

export const userSchema = z.object({
  user: z
    .object({
      username: z.string().nullable(),
    })
    .nullable(),
  profile_img_url: z.string(),
  address: z.string(),
  config: z.string(),
});
