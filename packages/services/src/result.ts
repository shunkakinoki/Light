import { ResultAsync } from "neverthrow";

export const fromPromiseWithError = <T, E = Error>(
  promise: Promise<T>,
): ResultAsync<T, E> => {
  return ResultAsync.fromPromise(promise, error => {
    return error as E;
  });
};
