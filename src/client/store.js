import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from './reducers'

const initialState = {}
let middleware = [thunk]

export default createStore(
    reducers,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
)