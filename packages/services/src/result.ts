import { ResultAsync, ok, err } from "neverthrow";
import type { SafeParseReturnType } from "zod";

export const fromPromise = <T, E = Error>(
  promise: Promise<T>,
): ResultAsync<T, E> => {
  return ResultAsync.fromPromise(promise, error => {
    return error as E;
  });
};

export type Validator<T> = (data: unknown) => SafeParseReturnType<unknown, T>;

export const validate = <T>(validator: Validator<T>) => {
  return async (data: ResultAsync<T, Error>) => {
    const result = validator(await data.unwrapOr(null));
    return result.success ? ok(result.data) : err(result.error);
  };
};
