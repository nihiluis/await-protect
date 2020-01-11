/**
 * Promise (or similar) interface
 */
interface PromiseLike<R> {
  then: (val: any) => PromiseLike<R>
  catch: (err: any) => void
}

/**
 * Wraps errors from your Promise (or similar) object into a [Result] which you can later destructure,
 * avoiding try { } catch (e) { } boilerplate.
 * 
 * @param fn The promise which is to be wrapped.
 */
export default async function protect<R, T>(fn: PromiseLike<R>): Promise<Result<R, T>> {
  const tuple: Result<R, T> = new Result()

  try {
    fn.then(val => tuple.ok = val).catch(err => tuple.err = err)
  } catch (e) {
    tuple.err = e
  }

  return tuple
}

/**
 * Wraps errors from multiple Promise (or similar) objects into a Result array which you can later 
 * iterate and then destructure, avoiding try { } catch (e) { } boilerplate.
 * 
 * @param fns The promises which are to be wrapped.
 */
export async function protectAll<R, T>(fns: PromiseLike<R>[]): Promise<Result<R, T>[]> {
  const tuples: Result<R, T>[] = []

  const newFns = fns.map((fn, i) => {
    return fn.then(val => tuples[i] = Result.ok(val)).catch(err => tuples[i] = Result.err(err))
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
export function lazyProtect<R, T>(fn: PromiseLike<R>): () => Promise<Result<R, T>> {
  return async () => await protect<R, T>(fn)
}

/**
 * Wraps the return objects or occurred error in one additional object.
 */
export class Result<Ok, Error> {
  ok?: Ok
  err?: Error
  
  static err<T>(err: T): Result<any, T> {
    const res = new Result<any, T>()
    res.err = err

    return res
  }

  static ok<T>(ok: T): Result<T, any> {
    const res = new Result<T, any>()
    res.ok = ok

    return res
  }
}
