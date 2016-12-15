export const FETCH_FONTS = 'FONTS_FETCH_REQUESTED';
export const FETCH_FONTS_SUCCESS = 'FETCH_FONTS_SUCCESS';
export const FETCH_FONTS_FAILURE = 'FETCH_FONTS_FAILURE';

export const EDIT_FONT = 'EDIT_FONT';

export const FETCH_FONTS_NUMBER = 'FETCH_FONTS_NUMBER';
export const FETCH_FONTS_NUMBER_SUCCESS = 'FETCH_FONTS_NUMBER_SUCCESS';
export const FETCH_FONTS_NUMBER_FAILURE = 'FETCH_FONTS_NUMBER_FAILURE';

export function fetchFonts() {
  return {
    type: FETCH_FONTS
  };
}

export function editFont() {
  return {
    type: EDIT_FONT
  };
}

export function fetchFontsNumber() {
  return {
    type: FETCH_FONTS_NUMBER
  };
}
