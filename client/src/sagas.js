import {put, fork} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import {
  FETCH_FONTS,
  FETCH_FONTS_NUMBER,
  CREATE_FONT,
  EDIT_FONT,
  DELETE_FONT,
  FONTS_OPERATION_SUCCESS,
  FONTS_OPERATION_FAILURE
} from './actions/fonts';

function* fetchFonts() {
  try {
    const req = yield fetch('/api/fonts');
    const json = yield req.json();
    yield put({type: FONTS_OPERATION_SUCCESS, fonts: json});
  } catch (e) {
    yield put({type: FONTS_OPERATION_FAILURE, message: e.statusText});
  }
}

function* fetchFontsNumber() {
  try {
    const req = yield fetch('/api/fonts/count');
    const json = yield req.json();
    yield put({type: FONTS_OPERATION_SUCCESS, fontsNumber: json.count});
  } catch (e) {
    yield put({type: FONTS_OPERATION_FAILURE, message: e.statusText});
  }
}

function* createFont(action) {
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

    yield put({type: FONTS_OPERATION_SUCCESS});
    yield put({type: FETCH_FONTS});
  } catch (e) {
    yield put({type: FONTS_OPERATION_FAILURE, message: e.message});
  }
}

function* editFont(action) {
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

    yield put({type: FONTS_OPERATION_SUCCESS});
    yield put({type: FETCH_FONTS});
  } catch (e) {
    yield put({type: FONTS_OPERATION_FAILURE, message: e.message});
  }
}

function* deleteFont(action) {
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

    yield put({type: FONTS_OPERATION_SUCCESS});
    yield put({type: FETCH_FONTS});
  } catch (e) {
    yield put({type: FONTS_OPERATION_FAILURE, message: e.message});
  }
}

function* watchFetchFonts() {
  yield takeLatest(FETCH_FONTS, fetchFonts);
}

function* watchFetchFontsNumber() {
  yield takeLatest(FETCH_FONTS_NUMBER, fetchFontsNumber);
}

function* watchCreateFont() {
  yield takeLatest(CREATE_FONT, createFont);
}

function* watchEditFont() {
  yield takeLatest(EDIT_FONT, editFont);
}

function* watchDeleteFont() {
  yield takeLatest(DELETE_FONT, deleteFont);
}

export default function* root() {
  yield [
    fork(watchFetchFonts),
    fork(watchFetchFontsNumber),
    fork(watchCreateFont),
    fork(watchEditFont),
    fork(watchDeleteFont)
  ];
}
