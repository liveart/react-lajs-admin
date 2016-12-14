import {
  FETCH_FONTS,
  FETCH_FONTS_SUCCESS,
  FETCH_FONTS_FAILURE,
  FETCH_FONTS_NUMBER,
  FETCH_FONTS_NUMBER_FAILURE,
  FETCH_FONTS_NUMBER_SUCCESS
} from '../actions/fonts';

const INITIAL_STATE = {
  fontsList: {fonts: [], fontsNumber: 0, error: null, loading: false}
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {

    case FETCH_FONTS:
      return {...state, fontsList: {fonts: [], error: null, loading: true}};
    case FETCH_FONTS_SUCCESS:
      return {...state, fontsList: {fonts: action.fonts, error: null, loading: false}};
    case FETCH_FONTS_FAILURE:
      error = action.message;
      return {...state, fontsList: {fonts: [], error: error, loading: false}};
    case FETCH_FONTS_NUMBER:
      return {...state, fontsList: {...state.fontsList, fontsNumber: 0, error: error, loading: true}};
    case FETCH_FONTS_NUMBER_SUCCESS:
      return {...state, fontsList: {...state.fontsList, fontsNumber: action.fontsNumber, error: error, loading: false}};
    case FETCH_FONTS_NUMBER_FAILURE:
      error = action.message;
      return {...state, fontsList: {...state.fontsList, fontsNumber: 0, error: error, loading: false}};
    default:
      return state;
  }
}
