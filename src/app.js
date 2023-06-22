import express from "express"

const app = express()

app.get("/tweets", (req, res) => {
    const resposta = "hellooooooo"

    res.send(resposta)
})

const PORT = 5000
app.listen(PORT, () => console.log(`ervidor está rodando na porta ${PORT}`))

