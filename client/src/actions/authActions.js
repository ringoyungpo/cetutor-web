import { GET_ERRORS } from './types'
import axios from 'axios'

//Register User
export const registerUser = async userData => async dispatch => {
  try {
    const res = await axios.post('api/users/', userData)
    console.log(res.data)
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    })
  }
}
