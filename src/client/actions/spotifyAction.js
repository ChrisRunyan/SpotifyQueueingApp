
//TYPES ****
export const PAUSE_PLAYBACK = 'PAUSE_PLAYBACK';
export const RESUME_PLAYBACK = 'RESUME_PLAYBACK';
export const REFRESH_AUTHORIZATION = 'REFRESH_AUTHORIZATION';
export const REQUEST_PENDING = 'REQUEST_PENDING';
// ****

//ENDPOINTS ****
const BASE_ENDPOINT = 'https://api.spotify.com/v1/';
const SEARCH_ENDPOINT = BASE_ENDPOINT + 'search';
const PLAYER_ENDPOINT = BASE_ENDPOINT + 'me/player';
// ****

const makeRequest = (access_token, endpoint, data) => {
    return new Request(endpoint, {
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Accept': 'application/json',
            'content-type': 'application/json',
        },
        method: 'PUT',
        data: data,
    });
}

const handleError = err => {
    if(err.status === 401) { /* ACCESS TOKEN EXPIRED */ }
    console.log(err)
}

export const pausePlayback = access_token => dispatch => {
    const request = makeRequest(access_token, PLAYER_ENDPOINT + '/pause', null)
    dispatch({ type: REQUEST_PENDING })
    fetch(request)
    .then(_ => {
        dispatch({
            type: PAUSE_PLAYBACK,
        })
    })
    .catch(error => handleError(error))
}

export const resumePlayback = access_token => dispatch => {
    const request = makeRequest(access_token, PLAYER_ENDPOINT + '/play', null)
    dispatch({ type: REQUEST_PENDING })
    fetch(request)
    .then(_ => {
        dispatch({
            type: RESUME_PLAYBACK,
        })
    })
    .catch(error => handleError(error))
}