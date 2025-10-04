import { z } from 'zod'
import { protect } from './index.js'

type Result<R, T extends Error> = [R, undefined] | [undefined, T]

/**
 * Wraps a Promise in a Result tuple that contains either the validated resolved value or the error.
 * Validates the successful result against a provided Zod schema.
 *
 * @param fn - The promise to be wrapped
 * @param schema - The Zod schema to validate the result against
 * @returns A Promise that resolves to a tuple containing either [value, undefined] or [undefined, error]
 * @template R - The type of the successful result
 * @template T - The type of the error, must extend Error
 */
export async function protectWithSchema<R, T extends Error>(
  fn: Promise<R>,
  schema: z.ZodType<R>
): Promise<Result<R, T>> {
  const [result, error] = await protect<R, T>(fn)

  if (error) {
    return [undefined, error]
  }

  try {
    const validated = schema.parse(result)
    return [validated, undefined]
  } catch (validationError) {
    return [undefined, validationError as T]
  }
}
