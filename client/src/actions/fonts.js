import * as actionTypes from '../actionTypes/fonts';

export const fetchFonts = () => {
  return {
    type: actionTypes.FETCH_FONTS
  };
};

export const fetchFontById = id => {
  return {
    type: actionTypes.FETCH_FONT_BY_ID,
    id
  };
};

export const fetchFontsNumber = () => {
  return {
    type: actionTypes.FETCH_FONTS_NUMBER
  };
};

export const createFont = font => {
  return {
    type: actionTypes.CREATE_FONT,
    font
  };
};

export const uploadFontFile = fontFile => {
  return {
    type: actionTypes.UPLOAD_FONT_FILE,
    fontFile
  };
};

export const editFont = (id, font) => {
  return {
    type: actionTypes.EDIT_FONT,
    id,
    newFont: font
  };
};

export const deleteFont = id => {
  return {
    type: actionTypes.DELETE_FONT,
    id
  };
};
