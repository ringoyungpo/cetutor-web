import {
  GET_CURRENT_USER_PAPERS,
  PAPER_LOADING,
  CLEAR_CURRENT_PAPER,
  GET_PAPERS_ALL,
} from '../actions/types'

const initialState = {
  paper: null,
  allPapers: null,
  currentUserPapers: null,
  loading: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PAPER_LOADING:
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
    default:
      return state
  }
}
