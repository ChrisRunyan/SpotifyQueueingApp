import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from './reducers'

const initialState = {}
const middleware = [thunk]

export const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
)