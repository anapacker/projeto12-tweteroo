import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

let usuarios = [
    {
        username: 'bobesponja',
        avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png"
    }
]
let tweets = [
    {
        username: "bobesponja",
        tweet: "Eu amo hambúrguer de siri!"
    }
]

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body
    if (!username || !avatar) {
        return res.status(422)
    }

    usuarios.push({ username, avatar })
    return res.status(201).send('OK')
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body
    const existeUser = tweets.find(user => user.username === username)
    if (!username || !tweet) {
        return res.status(400)
    }
    if (!existeUser) {
        return res.status(401).send("UNAUTHORIZED")
    }
    tweets.push({ username, tweet })
    res.status(201).send("OK/CREATED")
})

app.get("/tweets", (req, res) => {
    res.send(tweets)
})


const PORT = 5000
app.listen(PORT, () => console.log(`servidor está rodando na porta ${PORT}`))

