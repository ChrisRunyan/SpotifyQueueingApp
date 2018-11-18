import { combineReducers } from 'redux'
import login from './loginReducer'
import firebase from './firebaseReducer'
import spotify from './spotifyReducer'

export default combineReducers({
    login,
    firebase,
    spotify,
});