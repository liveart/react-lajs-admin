import {put} from 'redux-saga/effects';
import * as actionTypes from '../actionTypes/fonts';


export function* fetchFonts() {
  try {
    const req = yield fetch('/api/fonts');
    const json = yield req.json();
    yield put({type: actionTypes.FONTS_OPERATION_SUCCESS, fonts: json});
  } catch (e) {
    yield put({type: actionTypes.FONTS_OPERATION_FAILURE, message: e.statusText});
  }
}

export function* fetchFontsNumber() {
  try {
    const req = yield fetch('/api/fonts/count');
    const json = yield req.json();
    yield put({type: actionTypes.FONTS_OPERATION_SUCCESS, fontsNumber: json.count});
  } catch (e) {
    yield put({type: actionTypes.FONTS_OPERATION_FAILURE, message: e.statusText});
  }
}

export function* createFont(action) {
  try {
    const req = yield fetch('/api/fonts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.font)
    });
    const json = yield req.json();
    if (!(req.status >= 200 && req.status < 300)) {
      throw new Error(json.error.message);
    }

    yield put({type: actionTypes.FONTS_OPERATION_SUCCESS});
    yield put({type: actionTypes.FETCH_FONTS});
  } catch (e) {
    yield put({type: actionTypes.FONTS_OPERATION_FAILURE, message: e.message});
  }
}

export function* editFont(action) {
  try {
    const req = yield fetch('/api/fonts/' + action.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.newFont)
    });
    const json = yield req.json();
    if (!(req.status >= 200 && req.status < 300)) {
      throw new Error(json.error.message);
    }

    yield put({type: actionTypes.FONTS_OPERATION_SUCCESS});
    yield put({type: actionTypes.FETCH_FONTS});
  } catch (e) {
    yield put({type: actionTypes.FONTS_OPERATION_FAILURE, message: e.message});
  }
}

export function* deleteFont(action) {
  try {
    const req = yield fetch('/api/fonts/' + action.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = yield req.json();
    if (!(req.status >= 200 && req.status < 300)) {
      throw new Error(json.error.message);
    }

    yield put({type: actionTypes.FONTS_OPERATION_SUCCESS});
    yield put({type: actionTypes.FETCH_FONTS});
  } catch (e) {
    yield put({type: actionTypes.FONTS_OPERATION_FAILURE, message: e.message});
  }
}
