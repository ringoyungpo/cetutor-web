import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}

const middleware = [thunk]

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  : null

const middlewareApplied = reduxDevtools
  ? compose(applyMiddleware(...middleware), reduxDevtools)
  : applyMiddleware(...middleware)

const store = createStore(rootReducer, initialState, middlewareApplied)

export default store
