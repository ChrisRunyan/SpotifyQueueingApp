import * as types from './types/loginTypes'
import querystring from 'querystring'

export const loginSuccess = (accessToken, refreshToken) =>  {
    return {
        type: types.LOGIN_SUCCESSFUL,
        accessToken,
        refreshToken
    }
}

export const loginFailure = err => {
    return {
        type: types.LOGIN_FAILED,
        error: err
    }
}

export const loginPending = () => {
    return {
        type: types.LOGIN_PENDING
    }
}

export const login = () => dispatch => {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);

    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    if(!hashParams.access_token) {
        const client_id = '25d7c8c99a33484ca4897f16f6ef10f5'
        const redirect_uri = 'http://localhost:3000/callback/'
        const scopes = [
            'playlist-read-private',
            'playlist-read-collaborative',
            'playlist-modify-public',
            'user-read-recently-played',
            'playlist-modify-private',
            'user-library-read',
            'user-read-private'
        ]
        
        const scope = scopes.join(' ')
        const response_type = 'token'

        const query = querystring.stringify({
            response_type,
            client_id,
            scope,
            redirect_uri
        })

        dispatch(loginPending)

        window.location.href = `https://accounts.spotify.com/authorize?${query}`
    } else {
        dispatch(loginSuccess(hashParams.access_token, hashParams.refresh_token))
    }
}
