

export interface PromiseResult<R, T> {
    res?: R
    err?: T
}

interface PromiseLike<R> {
    then: (val: any) => PromiseLike<R>
    catch: (err: any) => void
  }
  
  export default async function protect<R, T>(fn: PromiseLike<R>): Promise<PromiseResult<R, T>> {
      const tuple: PromiseResult<R, T> = {}
  
      await fn.then(val => tuple.res = val).catch(err => tuple.err = err)
  
      return tuple
  }