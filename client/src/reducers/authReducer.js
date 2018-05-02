import { SET_CURRENT_USER } from '../actions/types'
import { isEmpty } from 'lodash'

const initialState = {
  isAuthenticated: false,
  // submitting: false,
  user: {},
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      }
    // case INFO_SUBMITTING:
    //   return {
    //     ...state,
    //     submitting: true,
    //   }
    // case INFO_SUBMITTED:
    //   return {
    //     ...state,
    //     submitting: false,
    //   }
    default:
      return state
  }
}
