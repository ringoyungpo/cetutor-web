import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import paperReudcer from './paperReducer'
import spinnerReducer from './spinnerReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  papers: paperReudcer,
  spinner: spinnerReducer,
})
