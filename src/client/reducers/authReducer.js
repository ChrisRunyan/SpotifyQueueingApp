import { INIT_AUTH, REFRESH_AUTH } from '../actions/authAction'

const defaultState = {}

export default (state = defaultState, action) => {
    switch (action.type) {
        case INIT_AUTH:
            console.log('auth reducer')
            return {
                ...state,
                access_token: action.access_token,
                scope: action.scope,
                token_type: action.token_type
            }
        default:
            return true;
    }
}