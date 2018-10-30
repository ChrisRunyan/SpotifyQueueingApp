import { JOIN_ROOM, FETCH_SONG, PUSH_SONG_COMPLETE } from '../actions/firebaseAction'

export default (state = {}, action) => {
    switch(action.type) {
        case JOIN_ROOM:
            return {
                ...state,
                room: action.payload
            }
        case FETCH_SONG:
            return {
                ...state,
                songs: action.payload
            }
        case PUSH_SONG_COMPLETE:
            return {
                ...state,
                songs: {
                    ...state.songs,
                    [action.payload.id]: action.payload
                }
            }
        default:
            return {
                ...state,
            }
    }
}