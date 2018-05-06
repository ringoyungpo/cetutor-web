import {
  SET_CURRENT_USER,
  ON_LOGIN_INPUT_CHANGE,
  GET_CURRENT_AUTH_STATE,
  ON_REGISTER_INPUT_CHANGE,
  CLEAR_REGISTER_INPUT,
  CLEAR_LOGIN_INPUT
} from '../actions/types'
import { isEmpty } from 'lodash'

const initialState = {
  isAuthenticated: false,
  // submitting: false,
  user: {},
  loginInput: {
    email: '',
    password: ''
  },
  registerInput: {
    nickname: '',
    email: '',
    password: '',
    passwordComfirmed: ''
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
      break
    case ON_LOGIN_INPUT_CHANGE:
      {
        const { name, value } = action.payload
        let { loginInput } = state
        loginInput[name] = value
        return {
          ...state,
          loginInput: { ...loginInput }
        }
      }
      break
    case ON_REGISTER_INPUT_CHANGE:
      {
        let { registerInput } = state
        const { name, value } = action.payload
        registerInput[name] = value
        return {
          ...state,
          registerInput: { ...registerInput }
        }
      }
      break
    case CLEAR_LOGIN_INPUT:
      {
        return {
          ...state,
          loginInput: {
            email: '',
            password: ''
          }
        }
      }
      break
    case CLEAR_REGISTER_INPUT:
      {
        return {
          ...state,
          registerInput: {
            nickname: '',
            email: '',
            password: '',
            passwordComfirmed: ''
          }
        }
      }
      break
    case GET_CURRENT_AUTH_STATE:
      return state
      break
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
      break
  }
}
