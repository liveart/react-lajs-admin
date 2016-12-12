import {FETCH_FONTS, FETCH_FONTS_SUCCESS, FETCH_FONTS_FAILURE} from '../actions';

const INITIAL_STATE = {
  fontsList: {fonts: [], error: null, loading: false}
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {

    case FETCH_FONTS:// start fetching posts and set loading = true
      return {...state, fontsList: {fonts: [], error: null, loading: true}};
    case FETCH_FONTS_SUCCESS:// return list of posts and make loading = false
      return {...state, fontsList: {fonts: action.payload, error: null, loading: false}};
    case FETCH_FONTS_FAILURE:// return error and make loading = false
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return {...state, fontsList: {fonts: [], error: error, loading: false}};
    default:
      return state;
  }
}
