const firebase = require('firebase')
const dotenv = require('dotenv').config()

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJ_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID
  }

const app = firebase.initializeApp(config)
const databaseRef = app.database().ref()
const roomsRef = databaseRef.child("rooms")

const getRoomByCode = roomCode => {
    return roomsRef.orderByChild("room_code")
    .equalTo(roomCode)
    .once('value')
    .then(result => {
        const key = Object.keys(result.val())[0]
        return roomsRef.child(key)
    })
}

const joinRoom = (roomCode, username) => {
    return getRoomByCode(roomCode)
    .then(ref => {
        const time_joined = new Date()
        const newUser = ref.child("users").push()
        newUser.set({ username, time_joined: time_joined.toISOString() })
        return ref
    })
}
    

const createRoom = (roomCode, roomName, userId, access_token) => 
    roomsRef.push({
        songs: [],
        users: [
            {
                username: userId,
                time_joined: new Date()
            }
        ],
        room_code: roomCode,
        room_name: roomName,
        room_owner: userId,
        spotify_access_token: access_token
    })

const addSong = (roomKey, song) => {
    const roomRef = roomsRef.child(roomKey)
    return roomRef.child("songs").push(song)
}


const voteOnSong = (roomKey, songKey, currentVotes) => {
    const refKey = `${songKey}/votes`
    roomsRef.child(roomKey).child("songs").update({
        [refKey]: currentVotes + 1
    })
}

module.exports = {
    app,
    databaseRef,
    roomsRef,
    joinRoom,
    createRoom,
    getRoomByCode,
    addSong,
}