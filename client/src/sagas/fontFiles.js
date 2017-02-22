import * as actionTypes from '../actionTypes/fontFiles';
import {dispatch} from './sagaFuncs';
import * as api from './api';

const endpoint = 'fontFiles';
const endpointUpload = 'containers/woff';

export function* fetchFontFiles() {
  try {
    const res = yield* api.retrieve(endpoint);
    yield dispatch({type: actionTypes.FONTS_FILE_OPERATION_SUCCESS, fontFiles: res});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_FILE_OPERATION_FAILURE, message: e});
  }
}
export function* fetchFontFilesNumber() {
  try {
    const res = yield* api.retrieveNumber(endpoint);
    yield dispatch({type: actionTypes.FONTS_FILE_OPERATION_SUCCESS, fontFileNumber: res});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_FILE_OPERATION_FAILURE, message: e});
  }
}

export function* createFontFile(action) {
  try {
    yield* api.create(endpoint, action.fontFile);
    yield dispatch({type: actionTypes.FONTS_FILE_OPERATION_SUCCESS});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_FILE_OPERATION_FAILURE, message: e});
  }
}

export function* editFontFile(action) {
  try {
    yield* api.update(endpoint, action.newFontFile, action.id);
    yield dispatch({type: actionTypes.FONTS_FILE_OPERATION_SUCCESS});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_FILE_OPERATION_FAILURE, message: e});
  }
}

export function* deleteFontFile(action) {
  try {
    yield* api.remove(endpoint, action.id);
    yield dispatch({type: actionTypes.FONTS_FILE_OPERATION_SUCCESS});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_FILE_OPERATION_FAILURE, message: e});
  }
}
export function* uploadFontFile(action) {
  try {
    const data = new FormData();
    data.append('file', action.fileWOFF);
    yield* api.upload(endpointUpload, data);
    yield dispatch({type: actionTypes.FONTS_FILE_OPERATION_SUCCESS});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_FILE_OPERATION_FAILURE, message: e});
  }
}

