import {takeLatest} from 'redux-saga';
import * as actionTypes from '../../actionTypes/fontFiles';
import * as fontsSagas from '../fontFiles';

export function* watchFetchFontFiles() {
  yield takeLatest(actionTypes.FETCH_FONT_FILES, fontsSagas.fetchFontFiles);
}

export function* watchFetchFontFilesNumber() {
  yield takeLatest(actionTypes.FETCH_FONT_FILES_NUMBER, fontsSagas.fetchFontFilesNumber);
}

export function* watchCreateFontFile() {
  yield takeLatest(actionTypes.CREATE_FONT_FILE, fontsSagas.createFontFile);
}

export function* watchUploadFontFile() {
  yield takeLatest(actionTypes.UPLOAD_FONT_FILE, fontsSagas.uploadFontFile);
}

export function* watchEditFontFile() {
  yield takeLatest(actionTypes.EDIT_FONT_FILE, fontsSagas.editFontFile);
}

export function* watchDeleteFontFile() {
  yield takeLatest(actionTypes.DELETE_FONT_FILE, fontsSagas.deleteFontFile);
}
