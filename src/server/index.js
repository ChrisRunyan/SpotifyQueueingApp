
const firebase = require('./firebase')
const dotenv = require('dotenv').config()       // Not explicitly used, but must be required
const express = require('express')
const querystring = require('querystring')
const request = require('request')
const port = process.env.PORT || 8080

// Setting up the server
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    path: '/ws',
    serveClient: false,
})

const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize?"
const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token?"
const CALLBACK_ENDPOINT = 'http://localhost:8080/api/callback/'
const HOMEPAGE_HASH = 'http://localhost:3000/#'

const base64EncodedAuthString = 
    new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64');

let room_code = ''

io.on('connection', socket => {
    socket.on('ping', () => {
        socket.emit('pong', 'pong')     // first param is the message 'code', second is the data
        io.sockets.emit(/* */)          // emit to every client
    })

    socket.on('firebase-join', (roomId, username) => joinRoom(socket, roomId, username))

    socket.on('firebase-create', (roomId, roomName, username, access_token) => createRoom(socket, roomId, roomName, username, access_token))

    socket.on('login', () => {
        const url = SPOTIFY_AUTH_ENDPOINT + 
            querystring.stringify({
                response_type: 'code',
                redirect_uri: CALLBACK_ENDPOINT,
                client_id: process.env.CLIENT_ID,
                scope: 'user-read-private user-read-playback-state user-modify-playback-state'
            })
        request.get(url)
    })

})


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
        const url = SPOTIFY_AUTH_ENDPOINT + 
            querystring.stringify({
                response_type: 'code',
                redirect_uri: CALLBACK_ENDPOINT,
                client_id: process.env.CLIENT_ID,
                scope: 'user-read-private user-read-playback-state user-modify-playback-state'
            })
        res.redirect(url)
    }
})

app.get("/api/refresh", (req, res) => {
    const refresh_token = req.query.refresh_token
    const handler = handleTokenResponse(res)
    const auth_options = {
        url: SPOTIFY_TOKEN_ENDPOINT,
        form: {
            refresh_token: refresh_token,
            redirect_uri: CALLBACK_ENDPOINT,
            grant_type: 'refresh_token'
        },
        headers: {
            'Authorization': 'Basic ' + base64EncodedAuthString
        },
        json: true
    }

    request.post(auth_options, (error, response, body) => handler(error, response, body))

})

app.get("/api/callback/", (req, res) => {
    const auth_code = req.query.code || null
    const handler = handleTokenResponse(res)
    const authOptions = {
        url: SPOTIFY_TOKEN_ENDPOINT,
        form: {
            code: auth_code,
            redirect_uri: CALLBACK_ENDPOINT,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + base64EncodedAuthString
        },
        json: true
    }

    request.post(authOptions, (error, response, body) => handler(error, response, body))

})

const joinRoom = (socket, roomCode, username) => {
    firebase.joinRoom(roomCode, username)
    .then(ref => {
        console.log(ref.toString())
    })
    
    // console.log(`Found room key ${key} for code ${roomId}`)
    // .then(result => {
    //     const key = Object.keys(result.val())[0]
    //     console.log(key)
    // })
    // firebase.joinRoom(roomId, username)
    // .then(room => {
    //     // console.log(room)
    //     socket.emit('firebase-join-success', {
    //         roomKey: room.key,
    //         roomCode: room.child("room_code").val(),
    //         roomName: room.child("room_name").val(),
    //         roomOwner: room.child("room_owner").val(),
    //         access_token: room.child("spotify_access_token").val(),
    //         songs: room.child("songs").val(),
    //         users: room.child("users").val()
    //     })
    // })
}

const createRoom = (socket, roomCode, roomId, username, access_token) => {
    const room = firebase.createRoom(roomCode, roomId, username, access_token)

    room.once("value", room => socket.emit('firebase-create-success', {
        roomId: room.key,
        roomCode: room.child("room_code").val(),
        roomName: room.child("room_name").val(),
        roomOwner: room.child("room_owner").val(),
        access_token: room.child("spotify_access_token").val(),
        songs: room.child("songs").val(),
        users: room.child("users").val()
    }))
}

const handleTokenResponse = res => (error, response, body) => {
    if (!error && response.statusCode === 200) {
        res.redirect(HOMEPAGE_HASH + querystring.stringify(body))
        // io.socket.emit('login success', body)
    } else {
        console.log(`Error: ${error} \nStatus Code: ${response.statusCode}`)
    }
}

http.listen(port, () => console.log(`Listening on port ${port}`))
