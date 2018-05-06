import axios from 'axios'

import {
  GET_PAPER,
  GET_PAPERS_ALL,
  GET_CURRENT_USER_PAPERS,
  PAPERS_LOADING,
  CLEAR_CURRENT_PAPER,
  GET_ERRORS,
  SET_CURRENT_USER,
  ON_PAPER_EDIT_CHANGE
} from './types'

import { api_key, base, api_secret, audio } from '../config/keys'
import sha1 from 'sha1'
import qs from 'qs'

// Get current paper
export const getCurrentUserPapers = () => dispatch => {
  dispatch(setPaperLoading())
  axios
    .get('/api/papers/token')
    .then(res => {
      dispatch({
        type: GET_CURRENT_USER_PAPERS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_CURRENT_USER_PAPERS,
        payload: []
      })
    })
}

// paper loading
export const setPaperLoading = () => {
  return {
    type: PAPERS_LOADING
  }
}

// paper clear
export const clearCurrentPaper = () => {
  return {
    type: CLEAR_CURRENT_PAPER
  }
}

// Create Paper
export const createPaper = (paperData, history) => dispatch => {
  console.log({ paperData })
  dispatch({
    type: GET_ERRORS,
    payload: {}
  })
  console.log({ paperData })
  dispatch({
    type: GET_PAPER,
    payload: paperData
  })
  console.log({ paperData })
  axios
    .post('/api/papers', paperData)
    .then(res => {
      history.push('/dashboard')
      dispatch({
        type: GET_CURRENT_USER_PAPERS,
        payload: null
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

// Update Paper
export const updatePaper = (paperData, history) => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: {}
  })
  axios
    .put('/api/papers/' + paperData._id, paperData)
    .then(res => {
      history.push('/dashboard')
      dispatch({
        type: GET_CURRENT_USER_PAPERS,
        payload: null
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
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
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
      history.push('/errors')
    })
}

// Delete Paper
export const deletePaper = (papers, paperId) => dispatch => {
  dispatch({
    type: GET_CURRENT_USER_PAPERS,
    payload: papers
  })
  axios
    .delete('/api/papers/' + paperId)
    .then(res => dispatch(getCurrentUserPapers()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const onPaperEditChange = e => dispatch => {
  dispatch({
    type: ON_PAPER_EDIT_CHANGE,
    payload: e.target
  })
}

export const setPaperEditing = paper => dispatch => {
  dispatch({
    type: GET_PAPER,
    payload: paper
  })
}

export const fileUploadHandler = e => dispatch => {
  const { name, value, files } = e.target
  const timestamp = Date.now()
  const tags = 'listening'
  const folder = 'listening'
  const signature = sha1(
    qs.stringify({
      folder,
      tags,
      timestamp
    }) + api_secret
  )
  const formData = new FormData()
  formData.append('file', files[0])
  formData.append('folder', folder)
  formData.append('signature', signature)
  formData.append('tags', tags)
  formData.append('timestamp', timestamp)
  formData.append('api_key', api_key)

  const authorization = axios.defaults.headers.common['Authorization']
  delete axios.defaults.headers.common['Authorization']
  axios({
    method: 'POST',
    url: audio,
    data: formData
  })
    .then(res => {
      const target = { name: name, value: res.data.secure_url }
      dispatch(onPaperEditChange({ target }))
    })
    .catch(error => {
      console.log(error)
    })
  axios.defaults.headers.common['Authorization'] = authorization
}
