import {put, fork} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import {
  FETCH_FONTS,
  FETCH_FONTS_SUCCESS,
  FETCH_FONTS_FAILURE,
  FETCH_FONTS_NUMBER,
  FETCH_FONTS_NUMBER_SUCCESS,
  FETCH_FONTS_NUMBER_FAILURE
} from './actions/fonts';

function* fetchFonts() {
  try {
    const req = yield fetch('/api/fonts');
    const json = yield req.json();
    yield put({type: FETCH_FONTS_SUCCESS, fonts: json});
  } catch (e) {
    yield put({type: FETCH_FONTS_FAILURE, message: e.statusText});
  }
}

function* fetchFontsNumber() {
  try {
    const req = yield fetch('/api/fonts/count');
    const json = yield req.json();
    yield put({type: FETCH_FONTS_NUMBER_SUCCESS, fontsNumber: json.count});
  } catch (e) {
    yield put({type: FETCH_FONTS_NUMBER_FAILURE, message: e.statusText});
  }
}

function* watchFetchFonts() {
  yield takeLatest(FETCH_FONTS, fetchFonts);
}

function* watchFetchFontsNumber() {
  yield takeLatest(FETCH_FONTS_NUMBER, fetchFontsNumber);
}

export default function* root() {
  yield [
    fork(watchFetchFonts),
    fork(watchFetchFontsNumber)
  ];
}
