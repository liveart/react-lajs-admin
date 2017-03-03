import {put, call} from 'redux-saga/effects';
import * as actionTypes from '../actionTypes/fonts';
import {dispatch} from './sagaFuncs';
import * as api from './api';

const endpoint = 'fonts';
const endpointUpload = 'containers/fonts';
const endpointVectors = 'containers/vectors';

export function* fetchFonts() {
  try {
    const res = yield* api.retrieve(endpoint);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS, fonts: res});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e});
  }
}
export function* fetchFontById(action) {
  try {
    const res = yield* api.retrieve(endpoint, action.id);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS, font: res});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e});
  }
}
export function* fetchFontsNumber() {
  try {
    const res = yield* api.retrieveNumber(endpoint);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS, fontsNumber: res});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e});
  }
}

export function* createFont(action) {
  try {
    yield* api.create(endpoint, action.font, action.token);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_FONTS});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e});
  }
}

export function* editFont(action) {
  try {
    yield* api.update(endpoint, action.newFont, action.id, action.token);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_FONTS});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e});
  }
}

export function* deleteFont(action) {
  try {
    yield* api.remove(endpoint, action.id, action.token);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_FONTS});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e});
  }
}
export function* uploadFontFile(action) {
  try {
    const data = new FormData();
    data.append('file', action.fontFile);
    yield* api.upload(endpointUpload, data);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e});
  }
}
export function* uploadVectors(action) {
  try {
    const data = new FormData();
    data.append('file', action.vectorFile);
    yield* api.upload(endpointVectors, data);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e});
  }
}




