import {takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../../actionTypes/files';
import * as fontsSagas from '../files';

export function* watchUploadFile() {
  yield takeLatest(actionTypes.UPLOAD_FILE, fontsSagas.uploadFile);
}
