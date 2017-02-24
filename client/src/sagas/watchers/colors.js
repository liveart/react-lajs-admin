import {takeEvery} from 'redux-saga';
import * as actionTypes from '../../actionTypes/colors';
import * as colorSagas from '../colors';

export function* watchFetchColors() {
  yield takeEvery(actionTypes.FETCH_COLORS, colorSagas.fetchColors);
}

export function* watchFetchColorsNumber() {
  yield takeEvery(actionTypes.FETCH_COLORS_NUMBER, colorSagas.fetchColorsNumber);
}

export function* watchCreateColor() {
  yield takeEvery(actionTypes.CREATE_COLOR, colorSagas.createColor);
}

export function* watchEditColor() {
  yield takeEvery(actionTypes.EDIT_COLOR, colorSagas.editColor);
}

export function* watchDeleteColor() {
  yield takeEvery(actionTypes.DELETE_COLOR, colorSagas.deleteColor);
}
