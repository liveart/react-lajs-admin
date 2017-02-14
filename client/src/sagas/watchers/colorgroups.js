import {takeLatest} from 'redux-saga';
import * as actionTypes from '../../actionTypes/colors';
import * as colorSagas from '../colors';

function* watchFetchColors() {
  yield takeLatest(actionTypes.FETCH_COLORS, colorSagas.fetchColors);
}

function* watchFetchColorsNumber() {
  yield takeLatest(actionTypes.FETCH_COLORS_NUMBER, colorSagas.fetchColorsNumber);
}

function* watchCreateColor() {
  yield takeLatest(actionTypes.CREATE_COLOR, colorSagas.createColor);
}

function* watchEditColor() {
  yield takeLatest(actionTypes.EDIT_COLOR, colorSagas.editColor);
}

function* watchDeleteColor() {
  yield takeLatest(actionTypes.DELETE_COLOR, colorSagas.deleteColor);
}
