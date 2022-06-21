import type { z, ZodRawShape } from "zod";

export const validateQuery = <
  T extends ZodRawShape,
  Q extends Record<string, unknown>,
>(
  querySchema: z.ZodObject<T>,
  query: Q,
) => {
  const result = querySchema.safeParse(query);
  if (!result.success) {
    //@ts-expect-error
    console.error(result.error);
    //TODO: Add discord bot
    throw Error("Invalid Schema");
  }
  return result.data;
};
