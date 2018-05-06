import {
  GET_ERRORS,
  SET_CURRENT_USER,
  INFO_SUBMITTING,
  INFO_SUBMITTED,
  ON_LOGIN_INPUT_CHANGE,
  ON_REGISTER_INPUT_CHANGE,
  GET_CURRENT_AUTH_STATE,
  CLEAR_LOGIN_INPUT,
  CLEAR_REGISTER_INPUT
} from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { setSubmitting, setSubmitted } from './spinnerAction'

export const setInfoSubmitting = () => {
  return {
    type: INFO_SUBMITTING
  }
}

export const setInfoSubmitted = () => {
  return {
    type: INFO_SUBMITTED
  }
}

//RegisterInput User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/', userData)
    .then(res => {
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
      dispatch({
        type: CLEAR_REGISTER_INPUT
      })
      history.push('/login')
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const onLoginInputChange = e => dispatch => {
  dispatch({
    type: ON_LOGIN_INPUT_CHANGE,
    payload: e.target
  })
}

export const onRegisterInputChange = e => dispatch => {
  dispatch({
    type: ON_REGISTER_INPUT_CHANGE,
    payload: e.target
  })
}

export const authIntial = () => dispatch => {
  dispatch({
    type: GET_CURRENT_AUTH_STATE,
    payload: null
  })
  dispatch({
    type: GET_ERRORS,
    payload: {}
  })
}

export const loginUser = userData => dispatch => {
  dispatch(setSubmitting())
  // console.log(setSubmitting())
  dispatch({
    type: GET_ERRORS,
    payload: {}
  })
  axios
    .post('api/users/token', userData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decode = jwt_decode(token)
      dispatch(setSubmitted())
      dispatch(setCurrentUser(decode))
      dispatch({
        type: CLEAR_LOGIN_INPUT
      })
    })
    .catch(err => {
      dispatch(setSubmitted())
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken')
  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
}
