import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import paperReudcer from './paperReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  papers: paperReudcer,
})
