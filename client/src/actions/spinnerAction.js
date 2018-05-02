import { SUBMITTING, SUBMITTED, LOADING, LOADED } from '../actions/types'

// loading
export const setLoading = () => {
  return {
    type: LOADING,
  }
}

// loaded
export const setLoaded = () => {
  return {
    type: LOADED,
  }
}

// submitting
export const setSubmitting = () => {
  return {
    type: SUBMITTING,
  }
}

// submitted
export const setSubmitted = () => {
  return {
    type: SUBMITTED,
  }
}
