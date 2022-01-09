type Result<R, T extends Error> = [R | undefined, T | undefined]

/**
 * Wraps errors from your Promise (or similar) object into a [Result] which you can later destructure,
 * avoiding try { } catch (e) { } boilerplate.
 * 
 * @param fn The promise which is to be wrapped.
 */
export default async function protect<R, T extends Error>(fn: Promise<R>): Promise<Result<R, T>> {
  const res: Result<R, T> = [undefined, undefined]

  try {
    await fn.then(val => res[0] = val).catch((err: T) => res[1] = err)
  } catch (e) {
    res[1] = e as T
  }

  return res
}

/**
 * Wraps errors from multiple Promise (or similar) objects into a Result array which you can later 
 * iterate and then destructure, avoiding try { } catch (e) { } boilerplate.
 * 
 * @param fns The promises which are to be wrapped.
 */
export async function protectAll<R, T extends Error>(fns: Promise<R>[]): Promise<Result<R, T>[]> {
  const tuples: Result<R, T>[] = []

  const newFns = fns.map(async (fn, i) => {
    tuples[i] = [undefined, undefined]

    try {
      const val = await fn
      return tuples[i][0] = val
    }
    catch (err) {
      return tuples[i][1] = err as T
    }
  })

  await Promise.all(newFns)

  return tuples
}

/**
 * Wraps protect into a function to be lazily evaluated. 
 * 
 * This can for example be used combined with redux-saga (for React).
 * 
 * @param fn 
 */
export function lazyProtect<R, T extends Error>(fn: Promise<R>): () => Promise<Result<R, T>> {
  return async () => await protect<R, T>(fn)
}
