# await-protect
Less verbose error handling when using promise await.

# Usage
Allows you to replace `try {} catch (e) {}`.

Use this:

```typescript
async function do() {
    const json = { "msg": "hey daisy" }

    const { res, err } = await protect<AxiosResponse, AxiosError>(
      axios.post(`${config.url}`, qs.stringify({
        data: new Buffer(JSON.stringify(a)).toString("base64")
      })))

    if (err) {
      console.log(err.message)
    }
  }
}
```

instead of this:

```typescript
async function do() {
    const json = { "msg": "sup" }

    try {
        await axios.post(`${config.url}`, qs.stringify({
            data: new Buffer(JSON.stringify(a)).toString("base64")
        }))
    } catch (err) {
        console.log((err) as AxiosError).message)
    }
}
```
