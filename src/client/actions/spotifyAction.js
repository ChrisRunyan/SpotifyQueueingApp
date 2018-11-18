import { loginRefresh } from './loginAction'
//TYPES ****
export const PAUSE_PLAYBACK = 'PAUSE_PLAYBACK';
export const RESUME_PLAYBACK = 'RESUME_PLAYBACK';
export const REFRESH_AUTHORIZATION = 'REFRESH_AUTHORIZATION';
export const REQUEST_PENDING = 'REQUEST_PENDING';
export const READ_PLAYBACK_STATE = 'READ_PLAYBACK_STATE';
// ****

//ENDPOINTS ****
const BASE_ENDPOINT = 'https://api.spotify.com/v1/';
const SEARCH_ENDPOINT = BASE_ENDPOINT + 'search';
const PLAYER_ENDPOINT = BASE_ENDPOINT + 'me/player';
// ****

const makeRequest = (access_token, endpoint, data, method) => {
    return new Request(endpoint, {
        headers: {
            'Authorization': 'Bearer ' + access_token,
            // 'Accept': 'application/json',
            // 'content-type': 'application/json',
        },
        method,
        data,
    });
}

const makePutRequest = (access_token, endpoint, data) => makeRequest(access_token, endpoint, data, 'PUT')
const makeGetRequest = (access_token, endpoint, data) => makeRequest(access_token, endpoint, data, 'GET')

const handleError = (response, tokens) => {
    if(response.status === 401) {   /* ACCESS TOKEN INVALID */ 
        window.location.href = `/api/refresh?refresh_token=${tokens.refresh_token}`
    }
    if(response.status === 403) { /* USER IS NOT PREMIUM */ }
    if(response.status === 404) { /* DEVICE NOT FOUND */ }
}

export const pausePlayback = tokens => dispatch => {
    const request = makePutRequest(tokens.access_token, PLAYER_ENDPOINT + '/pause', null)
    dispatch({ type: REQUEST_PENDING })
    fetch(request)
    .then(response => {
        if(response.status !== 200) {
            handleError(response, tokens)
        }
        dispatch({
            type: PAUSE_PLAYBACK,
        })
    })
    .catch(error => handleError(error, tokens))
}

export const resumePlayback = tokens => dispatch => {
    const request = makePutRequest(tokens.access_token, PLAYER_ENDPOINT + '/play', null)
    dispatch({ type: REQUEST_PENDING })
    fetch(request)
    .then(response => {
        if(response.status !== 200) {
            handleError(response)
        }
        dispatch({
            type: RESUME_PLAYBACK,
        })
    })
    .catch(error => handleError(error, tokens))
}

export const getCurrentPlaybackState = tokens => dispatch => {
    const request = makeGetRequest(tokens.access_token, PLAYER_ENDPOINT, null)
    dispatch({ type: REQUEST_PENDING })
    fetch(request)
    .then(response => {
        if(response.status !== 200) {
            handleError(response)
        }
        return response.json()
    })
    .then(res => {
        dispatch({
            type: READ_PLAYBACK_STATE,
            payload: res
        })
    })
    .catch(err => handleError(err, tokens))
}