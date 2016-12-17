export const FETCH_FONTS = 'FONTS_FETCH_REQUESTED';
export const EDIT_FONT = 'EDIT_FONT';
export const DELETE_FONT = 'DELETE_FONT';
export const FETCH_FONTS_NUMBER = 'FETCH_FONTS_NUMBER';
export const FONTS_OPERATION_SUCCESS = 'FONTS_OPERATION_SUCCESS';
export const FONTS_OPERATION_FAILURE = 'FONTS_OPERATION_FAILURE';

export const fetchFonts = () => {
  return {
    type: FETCH_FONTS
  };
};

export const editFont = (id, font) => {
  return {
    type: EDIT_FONT,
    id,
    newFont: font
  };
};

export const fetchFontsNumber = () => {
  return {
    type: FETCH_FONTS_NUMBER
  };
};

export const deleteFont = id => {
  return {
    type: DELETE_FONT,
    id
  };
};
