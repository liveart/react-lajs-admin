import {takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../../actionTypes/colors';
import * as colorSagas from '../colors';

export function* watchFetchColors() {
  yield takeLatest(actionTypes.FETCH_COLORS, colorSagas.fetchColors);
}

export function* watchFetchColorById() {
  yield takeLatest(actionTypes.FETCH_COLOR_BY_ID, colorSagas.fetchColorById);
}

export function* watchFetchColorsNumber() {
  yield takeLatest(actionTypes.FETCH_COLORS_NUMBER, colorSagas.fetchColorsNumber);
}

export function* watchCreateColor() {
  yield takeLatest(actionTypes.CREATE_COLOR, colorSagas.createColor);
}

export function* watchEditColor() {
  yield takeLatest(actionTypes.EDIT_COLOR, colorSagas.editColor);
}

export function* watchDeleteColor() {
  yield takeLatest(actionTypes.DELETE_COLOR, colorSagas.deleteColor);
}
