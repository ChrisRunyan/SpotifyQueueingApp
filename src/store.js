import { createStore, applyMiddleware } from 'redux'
import { composeWithDevtools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from './reducers'

const initialState = {}
const middleware = [thunk]

export const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)
)