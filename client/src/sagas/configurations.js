import * as actionTypes from '../actionTypes/configurations';
import {dispatch} from './sagaFuncs';
import * as api from './api';
import {MESSAGE_ENTITY_CREATED, MESSAGE_ENTITY_UPDATED, MESSAGE_ENTITY_DELETED} from '../definitions';

const entityName = 'Configuration';

const endpoint = 'configurations';

export function* fetchConfigurations() {
  try {
    const res = yield* api.retrieve(endpoint);
    yield dispatch({type: actionTypes.CONFIGURATION_OPERATION_SUCCESS, configurations: res});
  } catch (e) {
    yield dispatch({type: actionTypes.CONFIGURATION_OPERATION_FAILURE, message: e.message});
  }
}

export function* fetchConfigurationById(action) {
  try {
    const res = yield* api.retrieve(endpoint, action.id);
    yield dispatch({type: actionTypes.CONFIGURATION_OPERATION_SUCCESS, configuration: res});
  } catch (e) {
    yield dispatch({type: actionTypes.CONFIGURATION_OPERATION_FAILURE, message: e});
  }
}

export function* createConfiguration(action) {
  try {
    yield* api.create(endpoint, action.configuration, action.token);
    yield dispatch({
      type: actionTypes.CONFIGURATION_OPERATION_SUCCESS,
      message: entityName + ' ' + MESSAGE_ENTITY_CREATED
    });
    yield dispatch({type: actionTypes.FETCH_CONFIGURATIONS});
  } catch (e) {
    yield dispatch({type: actionTypes.CONFIGURATION_OPERATION_FAILURE, message: e.message});
  }
}

export function* editConfiguration(action) {
  try {

    console.warn(action.newConfiguration)
    yield* api.update(endpoint, action.newConfiguration, action.id, action.token);
    yield dispatch({
      type: actionTypes.CONFIGURATION_OPERATION_SUCCESS,
      message: entityName + ' ' + MESSAGE_ENTITY_UPDATED
    });
    yield dispatch({type: actionTypes.FETCH_CONFIGURATIONS});
  } catch (e) {
    yield dispatch({type: actionTypes.CONFIGURATION_OPERATION_FAILURE, message: e.message});
  }
}

export function* deleteConfiguration(action) {
  try {
    yield* api.remove(endpoint, action.id, action.token);
    yield dispatch({
      type: actionTypes.CONFIGURATION_OPERATION_SUCCESS,
      message: entityName + ' ' + MESSAGE_ENTITY_DELETED
    });
    yield dispatch({type: actionTypes.FETCH_CONFIGURATIONS});
  } catch (e) {
    yield dispatch({type: actionTypes.CONFIGURATION_OPERATION_FAILURE, message: e.message});
  }
}
