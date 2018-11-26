const dotenv = require('dotenv').config()       // Not explicitly used, but must be required
const express = require('express')
const querystring = require('querystring')
const request = require('request')

const port = process.env.PORT || 8080
const app = express()

app.get("/ping", (req, res) => {
    return res.send(JSON.stringify({
        "pong": "pong"
    }))
})

app.get("/api/credentials", (req, res) => {
    return res.send(JSON.stringify({
        "client_id": process.env.CLIENT_ID
    }))
})

app.get("/api/login", (req, res) => {
    if (req.method === 'OPTIONS') {
        res.status(200).send()
    } else {
        const url = "https://accounts.spotify.com/authorize?" + 
            querystring.stringify({
                response_type: 'code',
                redirect_uri: "http://localhost:8080/api/callback/",
                client_id: process.env.CLIENT_ID,
                scope: 'user-read-private user-read-playback-state user-modify-playback-state'
            })
        res.redirect(url)
    }
})

app.get("/api/callback/", (req, res) => {
    const auth_code = req.query.code || null
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token?',
        form: {
            code: auth_code,
            redirect_uri: 'http://localhost:8080/api/callback/',
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')
        },
        json: true
    }

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            console.log('Body after POST: ' + body)
            res.redirect('http://localhost:3000/#' + querystring.stringify(body))
        } else {
            console.log(`Error: ${error} \nStatus Code: ${response.statusCode}`)
        }
    })

})

app.listen(port, () => console.log(`Listening on port ${port}`))
