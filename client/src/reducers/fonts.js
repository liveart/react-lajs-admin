import * as actionType from '../actionTypes/fonts';

const INITIAL_STATE = {
  font: null, fonts: [], fontsNumber: 0, fontsError: null, fontsLoading: false, fontsMessage: null
};

export default function (state = INITIAL_STATE, action) {
  let fontsError;
  switch (action.type) {
    case actionType.FONTS_OPERATION_SUCCESS:
      return {
        ...state,
        font: action.font || state.font,
        fonts: action.fonts || state.fonts,
        fontsNumber: action.fontsNumber || state.fontsNumber,
        fontsError: null,
        fontsMessage: action.message || null,
        fontsLoading: false
      };
    case actionType.FONTS_OPERATION_FAILURE:
      fontsError = action.message;
      return {...state, fontsMessage: null, fontsError, fontsLoading: false};
    case actionType.FETCH_FONT_BY_ID:
      return {...state, fontsMessage: null, font: null, fontsError: null, fontsLoading: true};
    case actionType.FETCH_FONTS:
      return {...state, fontsMessage: null, fontsError: null, fontsLoading: true};
    case actionType.FETCH_FONTS_NUMBER:
      return {...state, fontsMessage: null, fontsNumber: 0, fontsError: null, fontsLoading: true};
    case actionType.CREATE_FONT:
      return {...state, fontsMessage: null, fontsError: null, fontsLoading: true};
    case actionType.UPLOAD_FONT_FILE:
      return {...state, fontsMessage: null, fontsError: null, fontsLoading: true};
    case actionType.EDIT_FONT:
      return {...state, fontsMessage: null, fontsError: null, fontsLoading: true};
    case actionType.DELETE_FONT:
      return {...state, fontsMessage: null, fontsError: null, fontsLoading: true};
    default:
      return state;
  }
}
