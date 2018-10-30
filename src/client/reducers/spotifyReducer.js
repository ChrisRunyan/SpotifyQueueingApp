import { PAUSE_PLAYBACK, RESUME_PLAYBACK, READ_PLAYBACK_STATE } from '../actions/spotifyAction'

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
        case READ_PLAYBACK_STATE:
            console.log(action.payload)
            return {
                ...state,
            }
        default:
            return {
                ...state,
            }
    }
}