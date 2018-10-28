import { roomRef, songRef } from '../firebase'

export const FETCH_ROOM = 'FIREBASE_FETCH_ROOM';
export const FETCH_SONG = 'FIREBASE_FETCH_SONG';
export const FETCH_PENDING = 'FIREBASE_FETCH_PENDING'
export const PUSH_PENDING = 'PUSH_PENDING'
export const PUSH_COMPLETE = 'PUSH_COMPLETE'

export const fetchRoom = roomId => dispatch => {
    dispatch({ type: FETCH_PENDING})
    roomRef.child(roomId).once("value", room => {
        console.log(JSON.stringify(room))
        dispatch({
            type: FETCH_ROOM,
            payload: room
        })
    })
}

export const fetchSong = songId => dispatch => {
    dispatch({ type: FETCH_PENDING })
    songRef.child(songId).once("value", song => {
        console.log(JSON.stringify(song))
        dispatch({
            type: FETCH_SONG,
            payload: song
        })
    })
}

export const pushSong = (roomId, songId) => dispatch => {
    dispatch({ type: PUSH_PENDING })
    roomRef.child(roomId).push({
        songId,
        votes: 0
    }, () => dispatch({ type: PUSH_COMPLETE }))
}