import * as actionTypes from '../actionTypes/fontFiles';

export const fetchFontFiles = () => {
  return {
    type: actionTypes.FETCH_FONT_FILES
  };
};

export const fetchFontFilesNumber = () => {
  return {
    type: actionTypes.FETCH_FONT_FILES_NUMBER
  };
};

export const createFontFile = fontFile => {
  return {
    type: actionTypes.CREATE_FONT_FILE,
    fontFile
  };
};

export const editFontFile = (id, fontFile) => {
  return {
    type: actionTypes.EDIT_FONT_FILE,
    id,
    newFontFile: fontFile
  };
};

export const uploadFontFile = fileWOFF => {
  return {
    type: actionTypes.UPLOAD_FONT_FILE,
    fileWOFF
  };
};

export const deleteFontFile = id => {
  return {
    type: actionTypes.DELETE_FONT_FILE,
    id
  };
};

