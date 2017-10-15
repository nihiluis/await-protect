export interface PromiseResult<R, T> {
    res?: R
    err?: T
}

export default async function protect<R, T>(fn: Promise<R>): Promise<PromiseResult<R, T>> {
    const tuple: PromiseResult<R, T> = {}

    await fn.then(val => tuple.res = val).catch(err => tuple.err = err)

    return tuple
}