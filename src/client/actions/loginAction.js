import querystring from 'querystring'

export const LOGIN_PENDING = 'LOGIN_PENDING'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL'

export const loginSuccess = authParams =>  {
    return {
        type: LOGIN_SUCCESSFUL,
        access_token: authParams.access_token,
        refresh_token: authParams.refresh_token,
        scope: authParams.scope,
        expires_in: authParams.expires_in,
        token_type: authParams.token_type
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
