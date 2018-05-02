import { SUBMITTING, SUBMITTED, LOADING, LOADED } from '../actions/types'

const initialState = {
  loading: false,
  submitting: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SUBMITTING:
      return {
        ...state,
        submitting: true,
      }
    case SUBMITTED:
      return {
        ...state,
        submitting: false,
      }
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    case LOADED:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}
