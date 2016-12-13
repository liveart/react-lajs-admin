export const FETCH_FONTS = 'FONTS_FETCH_REQUESTED';
export const FETCH_FONTS_SUCCESS = 'FETCH_FONTS_SUCCESS';
export const FETCH_FONTS_FAILURE = 'FETCH_FONTS_FAILURE';

export function fetchFonts() {
  return {
    type: FETCH_FONTS
  };
}

export function fetchFontsSuccess(fonts) {
  return {
    type: FETCH_FONTS_SUCCESS,
    payload: fonts
  };
}

export function fetchFontsFailure(error) {
  return {
    type: FETCH_FONTS_FAILURE,
    payload: error
  };
}
