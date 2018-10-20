import { FETCH_ROOM, FETCH_SONGS } from '../actions/firebaseAction'

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_ROOM:
            return {
                ...state,
            }
        default:
            return {
                ...state,
            }
    }
}