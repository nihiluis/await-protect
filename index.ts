interface PromiseLike<R> {
  then: (val: any) => PromiseLike<R>
  catch: (err: any) => void
}

export default async function protect<R, T>(fn: PromiseLike<R>): Promise<Result<R, T>> {
  const tuple: Result<R, T> = new Result()

  try {
    await fn.then(val => tuple.res = val).catch(err => tuple.err = err)
  } catch (e) {
    tuple.err = e
  }

  return tuple
}

export async function protectAll<R, T>(fns: PromiseLike<R>[]): Promise<Result<R, T>[]> {
  const tuples: Result<R, T>[] = []

  const newFns = fns.map((fn, i) => {
    return fn.then(val => tuples[i] = Result.ok(val)).catch(err => tuples[i] = Result.err(err))
  })

  await Promise.all(newFns)

  return tuples
}

export function gprotect<R, T>(fn: PromiseLike<R>): () => Promise<Result<R, T>> {
  const hi = async () => await protect<R, T>(fn)

  return hi
}

export class Result<R, T> {
  res?: R
  err?: T

  ok_to<A>(a: (r: R) => A): Result<A, T> {
    const res = new Result<A, T>()
    if (this.res) {
      res.res = a(this.res)
    }

    res.err = this.err

    return res
  }

  to<A, B>(a: (r: R) => A, b: (err: T) => B): Result<A, B> {
    const res = new Result<A, B>()
    if (this.res) {
      res.res = a(this.res)
    }

    if (this.err) {
      res.err = b(this.err)
    }

    return res
  }

  static err<T>(err: T): Result<any, T> {
    const res = new Result<any, T>()
    res.err = err

    return res
  }

  static ok<T>(ok: T): Result<T, any> {
    const res = new Result<T, any>()
    res.res = ok

    return res
  }
}
