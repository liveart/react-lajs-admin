import {takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../../actionTypes/colorgroups';
import * as colorgroupSagas from '../colorgroups';

export function* watchFetchColorgroups() {
  yield takeLatest(actionTypes.FETCH_COLORGROUPS, colorgroupSagas.fetchColorgroups);
}

export function* watchFetchColorgroupById() {
  yield takeLatest(actionTypes.FETCH_COLORGROUP_BY_ID, colorgroupSagas.fetchColorgroupById);
}

export function* watchFetchColorgroupsNumber() {
  yield takeLatest(actionTypes.FETCH_COLORGROUPS_NUMBER, colorgroupSagas.fetchColorgroupsNumber);
}

export function* watchCreateColorgroup() {
  yield takeLatest(actionTypes.CREATE_COLORGROUP, colorgroupSagas.createColorgroup);
}

export function* watchEditColorgroup() {
  yield takeLatest(actionTypes.EDIT_COLORGROUP, colorgroupSagas.editColorgroup);
}

export function* watchDeleteColorgroup() {
  yield takeLatest(actionTypes.DELETE_COLORGROUP, colorgroupSagas.deleteColorgroup);
}
