import { describe, test, expect } from 'vitest'
import { protect, protectAll } from './index.js'

describe('protect', () => {
  test('should handle successful promises', async () => {
    const promise = Promise.resolve('success')
    const [result, error] = await protect(promise)

    expect(result).toBe('success')
    expect(error).toBeUndefined()
  })

  test('should handle rejected promises', async () => {
    const testError = new Error('test error')
    const promise = Promise.reject(testError)
    const [result, error] = await protect(promise)

    expect(result).toBeUndefined()
    expect(error).toBe(testError)
  })

  test('should handle thrown errors', async () => {
    const testError = new Error('test error')
    const promise = new Promise(() => {
      throw testError
    })
    const [result, error] = await protect(promise)

    expect(result).toBeUndefined()
    expect(error).toBe(testError)
  })
})

describe('protectAll', () => {
  test('should handle multiple successful promises', async () => {
    const promises = [
      Promise.resolve('first'),
      Promise.resolve('second'),
      Promise.resolve('third'),
    ]

    const results = await protectAll(promises)

    expect(results).toEqual([
      ['first', undefined],
      ['second', undefined],
      ['third', undefined],
    ])
  })

  test('should handle mixed success and failure promises', async () => {
    const error1 = new Error('error1')
    const error2 = new Error('error2')

    const promises = [
      Promise.resolve('success'),
      Promise.reject(error1),
      Promise.resolve('another success'),
      Promise.reject(error2),
    ]

    const results = await protectAll(promises)

    expect(results).toEqual([
      ['success', undefined],
      [undefined, error1],
      ['another success', undefined],
      [undefined, error2],
    ])
  })

  test('should maintain order of results', async () => {
    const promises = [
      new Promise((resolve) => setTimeout(() => resolve('slow'), 100)),
      Promise.resolve('fast'),
      new Promise((resolve) => setTimeout(() => resolve('medium'), 50)),
    ]

    const results = await protectAll(promises)

    expect(results).toEqual([
      ['slow', undefined],
      ['fast', undefined],
      ['medium', undefined],
    ])
  })
})
