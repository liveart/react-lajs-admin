import {FETCH_FONTS, FETCH_FONTS_SUCCESS, FETCH_FONTS_FAILURE} from '../actions';

const INITIAL_STATE = {
  fontsList: {fonts: [], error: null, loading: false}
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
    default:
      return state;
  }
}
