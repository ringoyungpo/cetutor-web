import axios from 'axios'

import {
  GET_PAPERS_ALL,
  GET_CURRENT_USER_PAPERS,
  PAPER_LOADING,
  CLEAR_CURRENT_PAPER,
  GET_ERRORS,
  SET_CURRENT_USER,
} from './types'

// Get current paper
export const getCurrentUserPapers = () => dispatch => {
  dispatch(setPaperLoading())
  axios
    .get('/api/papers/token')
    .then(res => {
      console.log('paperdata')
      console.log(res.data)
      dispatch({
        type: GET_CURRENT_USER_PAPERS,
        payload: res.data,
      })
    })
    .catch(err => {
      console.log('paperdata')
      console.log(err)
      dispatch({
        type: GET_CURRENT_USER_PAPERS,
        payload: [],
      })
    })
}

// paper loading
export const setPaperLoading = () => {
  return {
    type: PAPER_LOADING,
  }
}

// paper clear
export const clearCurrentPaper = () => {
  return {
    type: CLEAR_CURRENT_PAPER,
  }
}

// Create Paper
export const createPaper = (paperData, history) => dispatch => {
  axios
    .post('/api/papers', paperData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// Delete Paper
export const deletePaper = paperId => dispatch => {
  axios
    .delete('/api/papers/' + paperId)
    .then(res => dispatch(getCurrentUserPapers()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}
