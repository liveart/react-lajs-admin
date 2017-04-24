import {takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../../actionTypes/configurations';
import * as configSagas from '../configurations';

export function* watchFetchConfigurations() {
  yield takeLatest(actionTypes.FETCH_CONFIGURATIONS, configSagas.fetchConfigurations);
}

export function* watchFetchConfigurationById() {
  yield takeLatest(actionTypes.FETCH_CONFIGURATION_BY_ID, configSagas.fetchConfigurationById);
}

export function* watchCreateConfiguration() {
  yield takeLatest(actionTypes.CREATE_CONFIGURATION, configSagas.createConfiguration);
}

export function* watchEditConfiguration() {
  yield takeLatest(actionTypes.EDIT_CONFIGURATION, configSagas.editConfiguration);
}

export function* watchDeleteConfiguration() {
  yield takeLatest(actionTypes.DELETE_CONFIGURATION, configSagas.deleteConfiguration);
}
