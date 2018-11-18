import { roomRef } from '../firebase'

export const JOIN_ROOM = 'FIREBASE_JOIN_ROOM';
export const FETCH_SONG = 'FIREBASE_FETCH_SONG';
export const FETCH_PENDING = 'FIREBASE_FETCH_PENDING'
export const PUSH_SONG_PENDING = 'PUSH_SONG_PENDING'
export const PUSH_SONG_COMPLETE = 'PUSH_SONG_COMPLETE'
export const PUSH_SONG_FAILED = 'PUSH_SONG_FAILED'
export const CREATE_ROOM_PENDING = 'CREATE_ROOM_PENDING'
export const CREATE_ROOM_COMPLETE = 'CREATE_ROOM_COMPLETE'
export const CREATE_ROOM_FAILED = 'CREATE_ROOM_FAILED'
export const VOTE_PENDING = 'VOTE_PENDING'
export const VOTE_COMPLETE = 'VOTE_COMPLETE'

export const joinRoom = roomId => dispatch => {
    dispatch({ type: FETCH_PENDING})
    roomRef.child(roomId).once("value", room => {
        dispatch({
            type: JOIN_ROOM,
            payload: room
        })
    })
}

export const createRooom = (roomId, ownerName) => dispatch => {
    dispatch({ type: CREATE_ROOM_PENDING });
    let newRoomRef = roomRef.push({
        roomId,
        ownerName,
        songList: []
    });
    dispatch({
        type: CREATE_ROOM_COMPLETE,
        payload: {
            id: roomId,
            songList: []
        }
    })
}

// export const fetchSong = songId => dispatch => {
//     dispatch({ type: FETCH_PENDING })
//     songRef.child(songId).once("value", song => {
//         console.log(JSON.stringify(song))
//         dispatch({
//             type: FETCH_SONG,
//             payload: song
//         })
//     })
// }

export const pushSong = (song, roomId, userId = 'default') => dispatch => {
    dispatch({ type: PUSH_PENDING })
    let newSongRef = roomRef.child(roomId).child(songs).push({
        ...song,
        votes: 0,
        added_by: userId,
    })
    dispatch({
        type: PUSH_COMPLETE,
        payload: {
            ...newSongRef.toJSON(),
            votes: 0,
            firebase: {
                path: newSongRef.toString(),
                key: newSongRef.key,
            }
        }
    })
}

export const voteOnSong = (roomId, songKey, currentVotes) => dispatch => {
    dispatch({ type: VOTE_PENDING })
    const key = `${songKey}/votes`
    roomRef.child(roomId).child(songs).update({
        [key]: currentVotes + 1
    });
    dispatch({
        type: VOTE_COMPLETE,
        payload: {
            song_key: songKey,
            newVotes: currentVotes + 1
        }
    })
}