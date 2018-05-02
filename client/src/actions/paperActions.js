import axios from 'axios'

import {
  GET_PAPER,
  GET_PAPERS_ALL,
  GET_CURRENT_USER_PAPERS,
  PAPERS_LOADING,
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
      // console.log('paperdata')
      // console.log(res.data)
      dispatch({
        type: GET_CURRENT_USER_PAPERS,
        payload: res.data,
      })
    })
    .catch(err => {
      // console.log('paperdata')
      // console.log(err)
      dispatch({
        type: GET_CURRENT_USER_PAPERS,
        payload: [],
      })
    })
}

// paper loading
export const setPaperLoading = () => {
  return {
    type: PAPERS_LOADING,
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
  dispatch({
    type: GET_ERRORS,
    payload: {},
  })
  dispatch({
    type: GET_PAPER,
    payload: paperData,
  })
  axios
    .post('/api/papers', paperData)
    .then(res => {
      history.push('/dashboard')
      dispatch({
        type: GET_CURRENT_USER_PAPERS,
        payload: null,
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors,
      })
    })
}

// Update Paper
export const updatePaper = (paperData, history) => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: {},
  })
  axios
    .put('/api/papers/' + paperData._id, paperData)
    .then(res => {
      history.push('/dashboard')
      dispatch({
        type: GET_CURRENT_USER_PAPERS,
        payload: null,
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    )
}

// Get paper by id
export const getPaperById = (id, history) => dispatch => {
  dispatch(setPaperLoading())
  axios
    .get(`/api/papers/${id}`)
    .then(res => {
      dispatch({
        type: GET_PAPER,
        payload: res.data,
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
      history.push('/errors')
    })
}

// Delete Paper
export const deletePaper = (papers, paperId) => dispatch => {
  dispatch({
    type: GET_CURRENT_USER_PAPERS,
    payload: papers,
  })
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
