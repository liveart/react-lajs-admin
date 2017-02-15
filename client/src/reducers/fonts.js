import * as actionType from '../actionTypes/fonts';

const INITIAL_STATE = {
  fontsList: [], fontsNumber: 0, error: null, loading: false
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case actionType.FONTS_OPERATION_SUCCESS:
      return {
        ...state,
        fontsList: action.fonts || state.fontsList,
        fontsNumber: action.fontsNumber || state.fontsNumber,
        error: null,
        loading: false
      };
    case actionType.FONTS_OPERATION_FAILURE:
      error = action.message;
      return {...state, error, loading: false};
    case actionType.FETCH_FONTS:
      return {...state, fontsList: [], error: null, loading: true};
    case actionType.FETCH_FONTS_NUMBER:
      return {...state, fontsNumber: 0, error: null, loading: true};
    case actionType.CREATE_FONT:
      return {...state, error: null, loading: true};
    case actionType.EDIT_FONT:
      return {...state, error: null, loading: true};
    case actionType.DELETE_FONT:
      return {...state, error: null, loading: true};
    default:
      return state;
  }
}
