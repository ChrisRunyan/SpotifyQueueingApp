import * as types from '../actions/types/loginTypes'

export default (state = {}, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESSFUL:
            return {
                ...state,
                access_token: action.access_token,
                refresh_token: action.refresh_token
            }
        case types.LOGIN_FAILED:
            return {
                ...state,
                loginError: action.error
            }
        default: 
            return state
    }
}