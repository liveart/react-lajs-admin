import * as actionTypes from '../actionTypes/colorizableColorConnection';
import {dispatch} from './sagaFuncs';
import * as api from './api';

const endpoint = 'ColorizableElementColors';

export function* fetchColorizableColorConnections() {
  try {
    const res = yield* api.retrieve(endpoint);// TODO Filter by Colorizable
    yield dispatch({
      type: actionTypes.COLORIZABLE_COLOR_CONNECTION_OPERATION_SUCCESS,
      colorizableColorConnections: res
    });
  } catch (e) {
    yield dispatch({type: actionTypes.COLORIZABLE_COLOR_CONNECTION_OPERATION_FAILURE, message: e.message});
  }
}

export function* createColorizableColorConnection(action) {
  try {
    yield* api.create(endpoint, action.colorizableColorConnection, action.token);
    yield dispatch({type: actionTypes.COLORIZABLE_COLOR_CONNECTION_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_COLORIZABLE_COLOR_CONNECTIONS});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORIZABLE_COLOR_CONNECTION_OPERATION_FAILURE, message: e.message});
  }
}

export function* editColorizableColorConnection(action) {
  try {
    yield* api.update(endpoint, action.newColorizableColorConnection, action.id, action.token);
    yield dispatch({type: actionTypes.COLORIZABLE_COLOR_CONNECTION_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_COLORIZABLE_COLOR_CONNECTIONS});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORIZABLE_COLOR_CONNECTION_OPERATION_FAILURE, message: e.message});
  }
}

export function* deleteColorizableColorConnection(action) {
  try {
    yield* api.remove(endpoint, action.id, action.token);
    yield dispatch({type: actionTypes.COLORIZABLE_COLOR_CONNECTION_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_COLORIZABLE_COLOR_CONNECTIONS});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORIZABLE_COLOR_CONNECTION_OPERATION_FAILURE, message: e.message});
  }
}
