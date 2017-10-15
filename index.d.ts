export interface PromiseResult<R, T> {
    res?: R
    err?: T
}

export default function protect<R, T>(fn: Promise<R>): Promise<PromiseResult<R, T>>