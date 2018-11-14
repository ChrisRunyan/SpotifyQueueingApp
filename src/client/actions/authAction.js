

export const INIT_AUTH = 'INIT_AUTH'
export const REFRESH_AUTH = 'REFRESH_AUTH'


export const initAuthorization = (authParams) => dispatch => {

    setTimeout(() => dispatch(refreshAuthorization(authParams.refreshToken)), authParams.expires_in)
    console.log(`Action authParams: ${JSON.stringify(authParams)}`)
    return {
        type: INIT_AUTH,
        access_token: authParams.access_token,
        scope: authParams.scope,
        token_type: authParams.token_type
    }
}

export const refreshAuthorization = (refreshToken) => dispatch => {

}
