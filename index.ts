type Result<R, T extends Error> = [R | undefined, T | undefined];

/**
 * Wraps a Promise in a Result tuple that contains either the resolved value or the error.
 * This helps avoid try-catch boilerplate by providing a more functional approach to error handling.
 *
 * @param fn - The promise to be wrapped
 * @returns A Promise that resolves to a tuple containing either [value, undefined] or [undefined, error]
 * @template R - The type of the successful result
 * @template T - The type of the error, must extend Error
 */
export default async function protect<R, T extends Error>(
  fn: Promise<R>
): Promise<Result<R, T>> {
  const res: Result<R, T> = [undefined, undefined];

  try {
    await fn.then((val) => (res[0] = val)).catch((err: T) => (res[1] = err));
  } catch (e) {
    res[1] = e as T;
  }

  return res;
}

export { protect };

/**
 * Wraps multiple Promises in Result tuples that contain either their resolved values or errors.
 * Processes all promises concurrently and maintains the original order in the returned array.
 *
 * @param fns - An array of promises to be wrapped
 * @returns A Promise that resolves to an array of Result tuples
 * @template R - The type of the successful results
 * @template T - The type of the errors, must extend Error
 */
export async function protectAll<R, T extends Error>(
  fns: Promise<R>[]
): Promise<Result<R, T>[]> {
  const tuples: Result<R, T>[] = [];

  const newFns = fns.map(async (fn, i) => {
    tuples[i] = [undefined, undefined];

    try {
      const val = await fn;
      return (tuples[i]![0] = val);
    } catch (err) {
      return (tuples[i]![1] = err as T);
    }
  });

  await Promise.all(newFns);

  return tuples;
}

/**
 * Creates a lazy-evaluated version of the protect function.
 * Returns a function that, when called, will execute the protected promise.
 * Useful for scenarios where you want to delay the execution, such as in Redux Saga effects.
 *
 * @param fn - The promise to be wrapped
 * @returns A function that when called returns a Promise resolving to a Result tuple
 * @template R - The type of the successful result
 * @template T - The type of the error, must extend Error
 */
export function lazyProtect<R, T extends Error>(
  fn: Promise<R>
): () => Promise<Result<R, T>> {
  return async () => await protect<R, T>(fn);
}
