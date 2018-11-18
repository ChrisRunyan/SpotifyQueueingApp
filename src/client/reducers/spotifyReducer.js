import { PAUSE_PLAYBACK, RESUME_PLAYBACK, READ_PLAYBACK_STATE } from '../actions/spotifyAction'

const genStateObject = item => {
    return {
        name: item.name,
        id: item.id,
        search_endpoint: item.href,
    }
}

const defaultState = {
    isPlaying: false,
    currently_playing: {
        song: null,
        album: null,
        artists: [],
    }
}

export default (state = defaultState, action) => {
    switch (action.type) {
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
            const item = action.payload.item
            console.log(action.payload)
            return {
                ...state,
                currently_playing: {
                    album: {
                        ...genStateObject(item.album),
                        image_url: item.album.images[1].url,
                    },
                    artists: item.album.artists.map(artist => genStateObject(artist)),
                    song: genStateObject(item)
                }
            }
        default:
            return {
                ...state,
            }
    }
}