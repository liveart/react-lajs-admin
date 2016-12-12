import {put, call} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import {FETCH_FONTS, FETCH_FONTS_SUCCESS, FETCH_FONTS_FAILURE} from './actions';

function* fetchFonts() {
  try {
    const req = yield fetch('/api/fonts');
    const json = yield req.json();
    yield put({type: FETCH_FONTS_SUCCESS, fonts: json});
  } catch (e) {
    yield put({type: FETCH_FONTS_FAILURE, message: e.statusText});
  }
}

function* watchFetchFonts() {
  yield takeLatest(FETCH_FONTS, fetchFonts);
}

export default watchFetchFonts;
