import actionTypes from '../actionTypes/user'

const {
  USERS_DATA_FETCHING,
  USERS_DATA_FETCH_SUCCESS,
} = actionTypes

const reducer = (state, action) => {
  switch (action.type) {
    case USERS_DATA_FETCHING:
      return {
        ...state,
        isFetching: true,
      }
    case USERS_DATA_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      }
    default:
      return state
  }
}

export default reducer
