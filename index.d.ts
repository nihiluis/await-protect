export type Result<R, T extends Error> = [R | undefined, T | undefined]

export default function protect<R, T extends Error>(fn: Promise<R>): Promise<Result<R, T>>
