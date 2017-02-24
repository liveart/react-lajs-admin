import {takeEvery} from 'redux-saga';
import * as actionTypes from '../../actionTypes/colorgroups';
import * as colorgroupSagas from '../colorgroups';

export function* watchFetchColorgroups() {
  yield takeEvery(actionTypes.FETCH_COLORGROUPS, colorgroupSagas.fetchColorgroups);
}

export function* watchFetchColorgroupById() {
  yield takeLatest(actionTypes.FETCH_COLORGROUP_BY_ID, colorgroupSagas.fetchColorgroupById);
}

export function* watchFetchColorgroupsNumber() {
  yield takeEvery(actionTypes.FETCH_COLORGROUPS_NUMBER, colorgroupSagas.fetchColorgroupsNumber);
}

export function* watchCreateColorgroup() {
  yield takeEvery(actionTypes.CREATE_COLORGROUP, colorgroupSagas.createColorgroup);
}

export function* watchEditColorgroup() {
  yield takeEvery(actionTypes.EDIT_COLORGROUP, colorgroupSagas.editColorgroup);
}

export function* watchDeleteColorgroup() {
  yield takeEvery(actionTypes.DELETE_COLORGROUP, colorgroupSagas.deleteColorgroup);
}
