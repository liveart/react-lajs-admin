import {takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../../actionTypes/colorizableElement';
import * as colorizableElementSagas from '../colorizableElement';

export function* watchFetchColorizableElements() {
  yield takeLatest(actionTypes.FETCH_COLORIZABLEELEMENTS, colorizableElementSagas.fetchColorizableElements);
}

export function* watchCreateColorizableElement() {
  yield takeLatest(actionTypes.CREATE_COLORIZABLEELEMENT, colorizableElementSagas.createColorizableElement);
}

export function* watchEditColorizableElement() {
  yield takeLatest(actionTypes.EDIT_COLORIZABLEELEMENT, colorizableElementSagas.editColorizableElement);
}

export function* watchDeleteColorizableElement() {
  yield takeLatest(actionTypes.DELETE_COLORIZABLEELEMENT, colorizableElementSagas.deleteColorizableElement);
}
