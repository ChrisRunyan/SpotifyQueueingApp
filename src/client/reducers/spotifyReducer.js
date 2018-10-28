import { PAUSE_PLAYBACK, RESUME_PLAYBACK } from '../actions/spotifyAction'

export default (state = {}, action) => {
    switch(action.type) {
        case PAUSE_PLAYBACK: 
            return {
                ...state,
                isPlaying: false
            }
        case RESUME_PLAYBACK:
            return {
                ...state,
                isPlaying: true
            }
        default:
            return {
                ...state,
            }
    }
}