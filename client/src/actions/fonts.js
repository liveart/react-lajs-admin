export const FETCH_FONTS = 'FONTS_FETCH_REQUESTED';
export const FETCH_FONTS_SUCCESS = 'FETCH_FONTS_SUCCESS';
export const FETCH_FONTS_FAILURE = 'FETCH_FONTS_FAILURE';

export const FETCH_FONTS_NUMBER = 'FETCH_FONTS_NUMBER';
export const FETCH_FONTS_NUMBER_SUCCESS = 'FETCH_FONTS_NUMBER_SUCCESS';
export const FETCH_FONTS_NUMBER_FAILURE = 'FETCH_FONTS_NUMBER_FAILURE';

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

export function fetchFontsNumber() {
  return {
    type: FETCH_FONTS_NUMBER
  };
}

export function fetchFontsNumberSuccess(fontsNumber) {
  return {
    type: FETCH_FONTS_NUMBER_SUCCESS,
    payload: fontsNumber
  };
}

export function fetchFontsNumberFailure(error) {
  return {
    type: FETCH_FONTS_NUMBER_FAILURE,
    payload: error
  };
}
