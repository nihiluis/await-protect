interface PromiseLike<R> {
    then: (val: any) => PromiseLike<R>
    catch: (err: any) => void
}

export default async function protect<R, T>(fn: PromiseLike<R>): Promise<Result<R, T>> {
    const tuple: Result<R, T> = new Result()

    await fn.then(val => tuple.res = val).catch(err => tuple.err = err)

    return tuple
}

class Result<R, T> {
    res?: R
    err?: T

    ok(): boolean {
        if (this.err) {
            return false
        }

        return true
    }

    unwrap(): R {
        return this.res!!
    }
}