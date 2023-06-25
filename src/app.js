import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

let usuarios = []
let tweets = []

app.get("/tweets", (req, res) => {
    let ultimosDezTweets = []
    for (let i = 0; i < 10; i++) {
        const posicaoASerAcessada = tweets.length - 1 - i
        if (posicaoASerAcessada < 0) {
            break
        }
        ultimosDezTweets.push(tweets[posicaoASerAcessada])
    }
    res.send(ultimosDezTweets)
})

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body
    if (!username || !avatar) {
        return res.status(422)
    }

    usuarios.push({ username, avatar })
    return res.status(201).send('OK')
})

app.post("/tweets", (req, res) => {
    const username = req.body.username
    const tweet = req.body.tweet
    //const {username, tweet} = req.body
    const existeUser = usuarios.some((user) => user.username === username)
    if (!username || !tweet) {
        return res.status(422)
    }
    if (!existeUser) {
        return res.status(401).send("UNAUTHORIZED")
    }
    tweets.push({ username, tweet })
    res.status(201).send("OK/CREATED")
})



const PORT = 5000
app.listen(PORT, () => console.log(`servidor está rodando na porta ${PORT}`))

