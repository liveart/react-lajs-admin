import {takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../../actionTypes/colorizable';
import * as colorizableSagas from '../colorizable';

export function* watchFetchColorizables() {
  yield takeLatest(actionTypes.FETCH_COLORIZABLES, colorizableSagas.fetchColorizables);
}

export function* watchCreateColorizable() {
  yield takeLatest(actionTypes.CREATE_COLORIZABLE, colorizableSagas.createColorizable);
}

export function* watchEditColorizable() {
  yield takeLatest(actionTypes.EDIT_COLORIZABLE, colorizableSagas.editColorizable);
}

export function* watchDeleteColorizable() {
  yield takeLatest(actionTypes.DELETE_COLORIZABLE, colorizableSagas.deleteColorizable);
}
