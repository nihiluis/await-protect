# await-protect

A lightweight TypeScript utility that simplifies promise error handling by wrapping promises in a Result type, eliminating nested try-catch blocks and providing better error typing.

## Installation

```bash
npm install await-protect
# or
yarn add await-protect
# or
pnpm add await-protect
# or
bun add await-protect
```

## Features

- 🎯 Clean error handling without try-catch blocks
- 💪 Full TypeScript support
- 🛡️ Type-safe error handling
- 🔄 Support for handling multiple promises
- 🔍 Optional type-safe validation with Zod

## Basic Usage

```typescript
import { protect } from 'await-protect'

async function fetchData() {
  // Returns [result, error] tuple
  const [response, error] = await protect(fetch('https://api.example.com/data'))

  if (error) {
    console.error('Failed to fetch:', error)
    return
  }

  // TypeScript knows response is defined here
  const data = await response.json()
  console.log(data)
}
```

**With Zod:**

```typescript
import { protectWithSchema } from 'await-protect/zod'
import { z } from 'zod'

// Define your schema
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  age: z.number().min(0).optional(),
  roles: z.array(z.string()),
})

type User = z.infer<typeof UserSchema>

async function fetchUser(id: number) {
  const [user, error] = await protectWithSchema(
    fetch(`/api/users/${id}`).then((r) => r.json()),
    UserSchema
  )

  if (error) {
    if (error instanceof z.ZodError) {
      console.error('Invalid data format:', error.errors)
    } else {
      console.error('Failed to fetch:', error)
    }
    return
  }

  console.log(`Found user ${user.name} with ${user.roles.length} roles`)
  return user
}
```

## Comparison with Traditional Try-Catch

### With await-protect:

```typescript
async function fetchUser() {
  const [user, error] = await protect(api.getUser(123))

  if (error) {
    console.error('Failed to fetch user:', error)
    return
  }

  return user
}
```

### Traditional approach:

```typescript
async function fetchUser() {
  try {
    const user = await api.getUser(123)
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return
  }
}
```

## API Reference

### `protect<R, T extends Error>(promise: Promise<R>): Promise<[R | undefined, T | undefined]>`

Wraps a single promise and returns a tuple containing either the result or error.

```typescript
const [result, error] = await protect(myPromise)
```

### `protectAll<R, T extends Error>(promises: Promise<R>[]): Promise<[R | undefined, T | undefined][]>`

Handles multiple promises simultaneously and returns an array of result tuples.

```typescript
const results = await protectAll([
  fetch('api/users'),
  fetch('api/posts'),
  fetch('api/comments'),
])

results.forEach(([result, error], index) => {
  if (error) {
    console.error(`Request ${index} failed:`, error)
    return
  }
  console.log(`Request ${index} succeeded:`, result)
})
```

### `protectWithSchema<R, T extends Error>(promise: Promise<R>, schema: z.ZodType<R>): Promise<[R | undefined, T | undefined]>`

Wraps a promise and validates its result against a Zod schema, providing type-safe validation of API responses.

```typescript
import { z } from 'zod'
import { protectWithSchema } from 'await-protect/zod'

// Define your schema
const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
})

async function fetchUser() {
  const [user, error] = await protectWithSchema(
    fetch('api/user').then((r) => r.json()),
    UserSchema
  )

  if (error) {
    console.error('Failed to fetch or validate user:', error)
    return
  }

  // TypeScript knows user matches UserSchema type
  console.log(user.name)
}
```
