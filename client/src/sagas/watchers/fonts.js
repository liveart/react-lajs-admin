import {takeLatest} from 'redux-saga';
import * as actionTypes from '../../actionTypes/fonts';
import * as fontsSagas from '../fonts';

export function* watchFetchFonts() {
  yield takeLatest(actionTypes.FETCH_FONTS, fontsSagas.fetchFonts);
}

export function* watchFetchFontsNumber() {
  yield takeLatest(actionTypes.FETCH_FONTS_NUMBER, fontsSagas.fetchFontsNumber);
}

export function* watchCreateFont() {
  yield takeLatest(actionTypes.CREATE_FONT, fontsSagas.createFont);
}

export function* watchUploadFont() {
  yield takeLatest(actionTypes.UPLOAD_FONT, fontsSagas.uploadFont);
}

export function* watchEditFont() {
  yield takeLatest(actionTypes.EDIT_FONT, fontsSagas.editFont);
}

export function* watchDeleteFont() {
  yield takeLatest(actionTypes.DELETE_FONT, fontsSagas.deleteFont);
}

