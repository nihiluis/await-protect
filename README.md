# await-protect
Wraps Promises into a Result object, which you can then await on and destructure in a Rust-esque way.
This will allow you to avoid the use of try-catch and may be more comfortable when wanting to type exceptions.

Note: This will sometimes force you to add ! where destructuring is concerned.

# Usage
```typescript
import protect from "await-protect"

async function do() {
    const json = { "msg": "hello." }

    const { res, err } = await protect<AxiosResponse, AxiosError>(
      axios.post(`${config.url}`, qs.stringify({
        data: new Buffer(JSON.stringify(a)).toString("base64")
      })))

    if (err) {
        console.log(err)
        return
    }
}
```

Instead of this:

```typescript
async function do() {
    const json = { "msg": "sup" }

    try {
        const res: AxiosResponse = await axios.post(`${config.url}`, qs.stringify({
            data: new Buffer(JSON.stringify(a)).toString("base64")
        }))
        
        console.log(res.data)
    } catch (err) {
        console.log((err) as AxiosError).message)
    }
}
```
