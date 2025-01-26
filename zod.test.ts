import { describe, test, expect } from 'vitest'
import { z } from 'zod'
import { protectWithSchema } from './zod.js'

describe('protectWithSchema', () => {
  // Define a test schema
  const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
  })

  test('should validate and return data when schema matches', async () => {
    const validData = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    }

    const promise = Promise.resolve(validData)
    const [result, error] = await protectWithSchema(promise, UserSchema)

    expect(error).toBeUndefined()
    expect(result).toEqual(validData)
  })

  test('should return validation error when data does not match schema', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invalidData: any = {
      id: '1', // should be number
      name: 'John Doe',
      email: 'john@example.com',
    }

    const promise = Promise.resolve(invalidData)
    const [result, error] = await protectWithSchema(promise, UserSchema)

    expect(result).toBeUndefined()
    expect(error).toBeInstanceOf(z.ZodError)
  })

  test('should handle promise rejection', async () => {
    const promiseError = new Error('Network error')
    const promise = Promise.reject(promiseError)

    const [result, error] = await protectWithSchema(promise, UserSchema)

    expect(result).toBeUndefined()
    expect(error).toBe(promiseError)
  })

  test('should handle null or undefined promise results', async () => {
    const promise = Promise.resolve(null)
    const [result, error] = await protectWithSchema(promise, UserSchema)

    expect(result).toBeUndefined()
    expect(error).toBeInstanceOf(z.ZodError)
  })
})
