import type { z, ZodRawShape } from "zod";

export const validateSchema = <
  T extends ZodRawShape,
  Q extends Record<string, unknown>,
>(
  zodSchema: z.ZodObject<T>,
  schema: Q,
) => {
  const result = zodSchema.safeParse(schema);
  if (!result.success) {
    //@ts-expect-error
    console.error(result.error);
    //TODO: Add discord bot
    throw Error("Invalid Schema");
  }
  return result.data;
};
