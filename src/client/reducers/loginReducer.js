import { LOGIN_SUCCESSFUL, LOGIN_FAILED } from '../actions/loginAction'

const defaultState = {
    access_token: '',
    refresh_token: ''
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESSFUL:
            return {
                ...state,
                access_token: action.access_token,
                refresh_token: action.refresh_token,
                expires_in: action.expires_in,
                scope: action.scope,
                token_type: action.token_type
            }
        case LOGIN_FAILED:
            return {
                ...state,
                loginError: action.error
            }
        default: 
            return state
    }
}