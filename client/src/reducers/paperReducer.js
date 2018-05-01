import {
  GET_CURRENT_USER_PAPERS,
  PAPERS_LOADING,
  CLEAR_CURRENT_PAPER,
  GET_PAPERS_ALL,
  GET_PAPER,
} from '../actions/types'

const initialState = {
  paper: null,
  allPapers: null,
  currentUserPapers: null,
  loading: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PAPERS_LOADING:
      return {
        ...state,
        loading: true,
      }
    case GET_CURRENT_USER_PAPERS:
      return {
        ...state,
        currentUserPapers: action.payload,
        loading: false,
      }
    case GET_PAPERS_ALL:
      return {
        ...state,
        allPapers: action.payload,
        loading: false,
      }
    case GET_PAPER:
      return {
        ...state,
        paper: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
