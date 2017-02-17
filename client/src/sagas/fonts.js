import {put, call} from 'redux-saga/effects';
import * as actionTypes from '../actionTypes/fonts';
import {dispatch} from './sagaFuncs';
import * as api from './api';

const endpoint = 'fonts';
const endpointUpload = 'containers/woff';

export function* fetchFonts() {
  try {
    const res = yield* api.retrieve(endpoint);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS, fonts: res});
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
    yield* api.create(endpoint, action.font);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e});
  }
}

export function* editFont(action) {
  try {
    yield* api.update(endpoint, action.newFont, action.id);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e});
  }
}

export function* deleteFont(action) {
  try {
    yield* api.remove(endpoint, action.id);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e});
  }
}



