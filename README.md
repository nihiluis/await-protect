# await-protect
Less verbose error handling when using promise await for Typescript.

# Usage
Allows you to replace `try {} catch (e) {}`.

Use this:

```typescript
import protect from "await-protect"

async function do() {
    const json = { "msg": "hey daisy" }

    const { res1, err } = await protect<AxiosResponse, AxiosError>(
      axios.post(`${config.url}`, qs.stringify({
        data: new Buffer(JSON.stringify(a)).toString("base64")
      })))

    if (err) {
        console.log(err)
        return
    }

    console.log(res1!!.data)

    const { res2, err2 } = await protect<AxiosResponse, AxiosError>(
      axios.post(`${config.url}`, qs.stringify({
        data: new Buffer(JSON.stringify(a)).toString("base64")
      })))

    if (err2) {
        console.log(err2)
        return
    }

    console.log(res2!!.data)

    const { res3, err3 } = await protect<AxiosResponse, AxiosError>(
      axios.post(`${config.url}`, qs.stringify({
        data: new Buffer(JSON.stringify(a)).toString("base64")
      })))

    if (err3) {
        console.log(err3)
        return
    }

    console.log(res3!!.data)

    const { res4, err4 } = await protect<AxiosResponse, AxiosError>(
      axios.post(`${config.url}`, qs.stringify({
        data: new Buffer(JSON.stringify(a)).toString("base64")
      })))

    if (err4) {
        console.log(err4)
        return
    }

    console.log(res4!!.data)
    if (err) {
      console.log(err.message)
    }
}
```

instead of this:

```typescript
async function do() {
    const json = { "msg": "sup" }

    try {
        const res1: AxiosResponse = await axios.post(`${config.url}`, qs.stringify({
            data: new Buffer(JSON.stringify(a)).toString("base64")
        }))
        
        console.log(res1.data)

        try {
            const res2: AxiosResponse = await axios.post(`${config.url}`, qs.stringify({
                data: new Buffer(JSON.stringify(a)).toString("base64")
            }))
            
            console.log(res2.data)

            try {
                const res3: AxiosResponse = await axios.post(`${config.url}`, qs.stringify({
                    data: new Buffer(JSON.stringify(a)).toString("base64")
                }))
                
                console.log(res3.data)

                try {
                    const res4: AxiosResponse = await axios.post(`${config.url}`, qs.stringify({
                        data: new Buffer(JSON.stringify(a)).toString("base64")
                    }))
                    
                    console.log(res4.data)
                } catch (err) {
                    console.log((err) as AxiosError).message)
                }
            } catch (err) {
                console.log((err) as AxiosError).message)
            }
        } catch (err) {
            console.log((err) as AxiosError).message)
        }
    } catch (err) {
        console.log((err) as AxiosError).message)
    }
}
```
