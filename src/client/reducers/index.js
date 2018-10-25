import { combineReducers } from 'redux'
import login from './loginReducer'
import firebase from './firebaseReducer'

export default combineReducers({
    login,
    firebase
})