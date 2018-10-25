import { FETCH_ROOM, FETCH_SONG } from '../actions/firebaseAction'

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_ROOM:
            return {
                ...state,
            }
        case FETCH_SONG:
            return {
                ...state,
            }
        default:
            return {
                ...state,
            }
    }
}