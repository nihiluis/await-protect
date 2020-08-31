# await-protect

Wraps promises to destructure values easily without having to nest with try catch.
Gives easier error typing as well.

# Usage

```typescript
import protect from "await-protect"

async function do() {
    const json = { "msg": "Hello" }

    const [res, err] = await protect(
      axios.post(`${config.url}`, qs.stringify({
        data: new Buffer(JSON.stringify(a)).toString("base64")
      })))

    if (err) {
        console.log(err)
        return
    }

    console.log(res.data)
}
```

Instead of this:

```typescript
async function do() {
    const json = { "msg": "Hello" }

    try {
        const res: AxiosResponse = await axios.post(`${config.url}`, qs.stringify({
            data: new Buffer(JSON.stringify(a)).toString("base64")
        }))

        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}
```
