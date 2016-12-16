import {put, fork} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import {
  FETCH_FONTS,
  DELETE_FONT,
  FETCH_FONTS_NUMBER,
  EDIT_FONT,
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

function* editFont(newFont) {
  try {
    const req = yield fetch('/api/fonts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newFont
    });
    const json = yield req.json();
    if (!(req.status >= 200 && req.status < 300)) {
      throw new Error(req.statusText);
    }

    yield put({type: FONTS_OPERATION_SUCCESS});
  } catch (e) {
    yield put({type: FONTS_OPERATION_FAILURE, message: e.message});
  }
}

function* deleteFont(id) {
  try {
    const req = yield fetch('/api/fonts/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = yield req.json();
    if (!(req.status >= 200 && req.status < 300)) {
      throw new Error(req.statusText);
    }

    yield put({type: FONTS_OPERATION_SUCCESS});
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

function* watchEditFont() {
  yield takeLatest(EDIT_FONT, editFont);
}

function* watchDeleteFont() {
  yield takeLatest(EDIT_FONT, deleteFont);
}

export default function* root() {
  yield [
    fork(watchFetchFonts),
    fork(watchFetchFontsNumber),
    fork(watchEditFont),
    fork(deleteFont)
  ];
}
