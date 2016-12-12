export const FETCH_FONTS = 'FETCH_FONTS';
export const FETCH_FONTS_SUCCESS = 'FETCH_FONTS_SUCCESS';
export const FETCH_FONTS_FAILURE = 'FETCH_FONTS_FAILURE';

export function fetchFonts() {
  const request = fetch('/api/fonts');
  console.log(fetch);
  return {
    type: FETCH_FONTS,
    payload: request
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
