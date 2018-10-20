import { roomRef, songRef } from '../firebase'

export const FETCH_ROOM = 'FIREBASE_FETCH_ROOM';
export const FETCH_SONG = 'FIREBASE_FETCH_SONG';
export const FETCH_PENDING = 'FIREBASE_FETCH_PENDING'

export const fetchRoom = roomId => dispatch => {
    dispatch({ type: FETCH_PENDING})
    roomRef.child(roomId).once("value", room => {
        console.log(JSON.stringify(room))
        dispatch({
            type: FETCH_ROOM
        })
    })
}