import * as actionType from '../actionTypes/fontFiles';

const INITIAL_STATE = {
  fontFiles: [], fontFilesNumber: 0, fontFilesError: null, fontFilesLoading: false
};

export default function (state = INITIAL_STATE, action) {
  let fontFilesError;
  switch (action.type) {
    case actionType.FONTS_FILE_OPERATION_SUCCESS:
      return {
        ...state,
        fontFiles: action.fontFiles || state.fontFiles,
        fontFilesNumber: action.fontFilesNumber || state.fontFilesNumber,
        fontFilesError: null,
        fontFilesLoading: false
      };
    case actionType.FONTS_FILE_OPERATION_FAILURE:
      fontFilesError = action.message;
      return {...state, fontFilesError, fontFilesLoading: false};
    case actionType.FETCH_FONT_FILES:
      return {...state, fontFiles: [], fontFilesError: null, fontFilesLoading: true};
    case actionType.FETCH_FONT_FILES_NUMBER:
      return {...state, fontFilesNumber: 0, fontFilesError: null, fontFilesLoading: true};
    case actionType.CREATE_FONT_FILE:
      return {...state, fontFilesError: null, fontFilesLoading: true};
    case actionType.UPLOAD_FONT_FILE:
      return {...state, fontFilesError: null, fontFilesLoading: true};
    case actionType.EDIT_FONT_FILE:
      return {...state, fontFilesError: null, fontFilesLoading: true};
    case actionType.DELETE_FONT_FILE:
      return {...state, fontFilesError: null, fontFilesLoading: true};
    default:
      return state;
  }
}
