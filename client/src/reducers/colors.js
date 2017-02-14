import * as actionType from '../actions/colors';

const INITIAL_STATE = {
  colors: [], colorsNumber: 0, error: null, loading: false
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case actionType.COLOR_OPERATION_SUCCESS:
      return {
        ...state,
        colors: action.colors || state.colors,
        colorsNumber: action.colorsNumber || state.colorsNumber,
        error: null,
        loading: false
      };
    case actionType.COLOR_OPERATION_FAILURE:
      error = action.message;
      return {...state, error, loading: false};
    case actionType.FETCH_COLORS:
      return {...state, colors: [], error: null, loading: true};
    case actionType.FETCH_COLORS_NUMBER:
      return {...state, colorsNumber: 0, error: null, loading: true};
    case actionType.CREATE_COLOR:
      return {...state, error: null, loading: true};
    case actionType.EDIT_COLOR:
      return {...state, error: null, loading: true};
    case actionType.DELETE_COLOR:
      return {...state, error: null, loading: true};
    default:
      return state;
  }
}
