import * as actionTypes from '../actionTypes/colorgroups';
import {dispatch} from './sagaFuncs';
import * as api from './api';

const endpoint = 'colorgroups';

export function* fetchColorgroups() {
  try {
    const res = yield* api.retrieve(endpoint);
    yield dispatch({type: actionTypes.COLORGROUP_OPERATION_SUCCESS, colorgroups: res});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORGROUP_OPERATION_FAILURE, message: e.message});
  }
}
export function* fetchColorgroupById(action) {
  try {
    const res = yield* api.retrieve(endpoint, action.id);
    yield dispatch({type: actionTypes.COLORGROUP_OPERATION_SUCCESS, colorgroup: res});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORGROUP_OPERATION_FAILURE, message: e.statusText});
  }
}

export function* fetchColorgroupsNumber() {
  try {
    const res = yield* api.retrieveNumber(endpoint);
    yield dispatch({type: actionTypes.COLORGROUP_OPERATION_SUCCESS, colorgroupsNumber: res});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORGROUP_OPERATION_FAILURE, message: e.message});
  }
}

export function* createColorgroup(action) {
  try {
    yield* api.create(endpoint, action.colorgroup, action.token);
    yield dispatch({type: actionTypes.COLORGROUP_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_COLORGROUPS});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORGROUP_OPERATION_FAILURE, message: e.message});
  }
}

export function* editColorgroup(action) {
  try {
    yield* api.update(endpoint, action.newColorgroup, action.id, action.token);
    yield dispatch({type: actionTypes.COLORGROUP_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_COLORGROUPS});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORGROUP_OPERATION_FAILURE, message: e.message});
  }
}

export function* deleteColorgroup(action) {
  try {
    yield* api.remove(endpoint, action.id, action.token);
    yield dispatch({type: actionTypes.COLORGROUP_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_COLORGROUPS});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORGROUP_OPERATION_FAILURE, message: e.message});
  }
}
