import * as actionTypes from '../actionTypes/colors';
import {dispatch} from './sagaFuncs';
import * as api from './api';

const endpoint = 'colors';

export function* fetchColors() {
  try {
    const res = yield* api.retrieve(endpoint);
    yield dispatch({type: actionTypes.COLOR_OPERATION_SUCCESS, colors: res});
  } catch (e) {
    yield dispatch({type: actionTypes.COLOR_OPERATION_FAILURE, message: e.message});
  }
}

export function* fetchColorById(action) {
  try {
    const res = yield* api.retrieve(endpoint, action.id);
    yield dispatch({type: actionTypes.COLOR_OPERATION_SUCCESS, color: res});
  } catch (e) {
    yield dispatch({type: actionTypes.COLOR_OPERATION_FAILURE, message: e});
  }
}

export function* fetchColorsNumber() {
  try {
    const res = yield* api.retrieveNumber(endpoint);
    yield dispatch({type: actionTypes.COLOR_OPERATION_SUCCESS, colorsNumber: res});
  } catch (e) {
    yield dispatch({type: actionTypes.COLOR_OPERATION_FAILURE, message: e.message});
  }
}

export function* createColor(action) {
  try {
    yield* api.create(endpoint, action.color, action.token);
    yield dispatch({type: actionTypes.COLOR_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_COLORS});
  } catch (e) {
    yield dispatch({type: actionTypes.COLOR_OPERATION_FAILURE, message: e.message});
  }
}

export function* editColor(action) {
  try {
    yield* api.update(endpoint, action.newColor, action.id, action.token);
    yield dispatch({type: actionTypes.COLOR_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_COLORS});
  } catch (e) {
    yield dispatch({type: actionTypes.COLOR_OPERATION_FAILURE, message: e.message});
  }
}

export function* deleteColor(action) {
  try {
    yield* api.remove(endpoint, action.id, action.token);
    yield dispatch({type: actionTypes.COLOR_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_COLORS});
  } catch (e) {
    yield dispatch({type: actionTypes.COLOR_OPERATION_FAILURE, message: e.message});
  }
}
