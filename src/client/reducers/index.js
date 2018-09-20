import { combineReducers } from 'redux'
import login from './loginReducer'
import auth from './authReducer'

export default combineReducers({
    login,
    auth
})