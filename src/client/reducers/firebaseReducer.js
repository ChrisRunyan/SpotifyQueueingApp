import { FETCH_ROOM, FETCH_SONG, PUSH_COMPLETE } from '../actions/firebaseAction'

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_ROOM:
            return {
                ...state,
                rooms: action.payload
            }
        case FETCH_SONG:
            return {
                ...state,
                songs: action.payload
            }
        case PUSH_COMPLETE:
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