import * as actionTypes from '../actionTypes/colors';

const INITIAL_STATE = {
  color: null, colors: [], colorsNumber: 0, colorsError: null, colorsLoading: false
};

export default function (state = INITIAL_STATE, action) {
  let colorsError;
  switch (action.type) {
    case actionTypes.COLOR_OPERATION_SUCCESS:
      return {
        ...state,
        color: action.color || state.color,
        colors: action.colors || state.colors,
        colorsNumber: action.colorsNumber || state.colorsNumber,
        colorsError: null,
        colorsLoading: false
      };
    case actionTypes.COLOR_OPERATION_FAILURE:
      colorsError = action.message;
      return {...state, colorsError, colorsLoading: false};
    case actionTypes.FETCH_COLOR_BY_ID:
      return {...state, color: null, colorsError: null, colorsLoading: true};
    case actionTypes.FETCH_COLORS:
      return {...state, colorsError: null, colorsLoading: true};
    case actionTypes.FETCH_COLORS_NUMBER:
      return {...state, colorsNumber: 0, colorsError: null, colorsLoading: true};
    case actionTypes.CREATE_COLOR:
      return {...state, colorsError: null, colorsLoading: true};
    case actionTypes.EDIT_COLOR:
      return {...state, colorsError: null, colorsLoading: true};
    case actionTypes.DELETE_COLOR:
      return {...state, colorsError: null, colorsLoading: true};
    default:
      return state;
  }
}
