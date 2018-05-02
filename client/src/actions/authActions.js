import {
  GET_ERRORS,
  SET_CURRENT_USER,
  INFO_SUBMITTING,
  INFO_SUBMITTED,
} from './types'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { setSubmitting, setSubmitted } from './spinnerAction'

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

export const loginUser = userData => dispatch => {
  dispatch(setSubmitting())
  dispatch({
    type: GET_ERRORS,
    payload: null,
  })
  axios
    .post('api/users/token', userData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decode = jwt_decode(token)
      dispatch(setCurrentUser(decode))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
  dispatch(setSubmitted())
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
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

export const setInfoSubmitting = () => {
  return {
    type: INFO_SUBMITTING,
  }
}

export const setInfoSubmitted = () => {
  return {
    type: INFO_SUBMITTED,
  }
}
