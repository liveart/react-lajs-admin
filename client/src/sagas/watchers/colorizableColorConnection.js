import {takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../../actionTypes/colorizableColorConnection';
import * as colorizableColorConnectionSagas from '../colorizableColorConnection';

export function* watchFetchColorizableColorConnections() {
    yield takeLatest(actionTypes.FETCH_COLORIZABLE_COLOR_CONNECTIONS, colorizableColorConnectionSagas.fetchColorizableColorConnections);
}

export function* watchCreateColorizableColorConnection() {
    yield takeLatest(actionTypes.CREATE_COLORIZABLE_COLOR_CONNECTION, colorizableColorConnectionSagas.createColorizableColorConnection);
}

export function* watchEditColorizableColorConnection() {
    yield takeLatest(actionTypes.EDIT_COLORIZABLE_COLOR_CONNECTION, colorizableColorConnectionSagas.editColorizableColorConnection);
}

export function* watchDeleteColorizableColorConnection() {
    yield takeLatest(actionTypes.DELETE_COLORIZABLE_COLOR_CONNECTION, colorizableColorConnectionSagas.deleteColorizableColorConnection);
}
