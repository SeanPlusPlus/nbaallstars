import actionTypes from '../actionTypes/main'

const {
  MAIN_DATA_FETCHING,
  MAIN_DATA_FETCH_SUCCESS,
} = actionTypes

const reducer = (state, action) => {
  switch (action.type) {
    case MAIN_DATA_FETCHING:
      return {
        ...state,
        isFetching: true,
      }
    case MAIN_DATA_FETCH_SUCCESS:
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
