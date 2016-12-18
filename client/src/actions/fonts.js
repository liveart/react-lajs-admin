export const FETCH_FONTS = 'FONTS_FETCH_REQUESTED';
export const FETCH_FONTS_NUMBER = 'FETCH_FONTS_NUMBER';
export const CREATE_FONT = 'CREATE_FONT';
export const EDIT_FONT = 'EDIT_FONT';
export const DELETE_FONT = 'DELETE_FONT';
export const FONTS_OPERATION_SUCCESS = 'FONTS_OPERATION_SUCCESS';
export const FONTS_OPERATION_FAILURE = 'FONTS_OPERATION_FAILURE';

export const fetchFonts = () => {
  return {
    type: FETCH_FONTS
  };
};

export const fetchFontsNumber = () => {
  return {
    type: FETCH_FONTS_NUMBER
  };
};

export const createFont = font => {
  return {
    type: CREATE_FONT,
    font
  };
};

export const editFont = (id, font) => {
  return {
    type: EDIT_FONT,
    id,
    newFont: font
  };
};

export const deleteFont = id => {
  return {
    type: DELETE_FONT,
    id
  };
};
