import {
  SET_CURRENT_USER,
  ON_LOGIN_INPUT_CHANGE,
  GET_CURRENT_AUTH_STATE
} from '../actions/types'
import { isEmpty } from 'lodash'

const initialState = {
  isAuthenticated: false,
  // submitting: false,
  user: {},
  loginInput: {
    email: '',
    password: ''
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case ON_LOGIN_INPUT_CHANGE:
      let { loginInput } = state
      const { name, value } = action.payload
      loginInput[name] = value
      return {
        ...state,
        loginInput: { ...loginInput }
      }
    case GET_CURRENT_AUTH_STATE:
      return state
    // case INFO_SUBMITTING:
    //   return {
    //     ...state,
    //     submitting: true,
    //   }
    // case INFO_SUBMITTED:
    //   return {
    //     ...state,
    //     submitting: false,
    //   }
    default:
      return state
  }
}
