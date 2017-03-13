import * as actionTypes from '../actionTypes/colorizableElement';
import {dispatch} from './sagaFuncs';
import * as api from './api';

const endpoint = 'colorizableElements';

export function* fetchColorizableElements() {
  try {
    const res = yield* api.retrieve(endpoint);
    yield dispatch({type: actionTypes.COLORIZABLEELEMENT_OPERATION_SUCCESS, colorizableElements: res});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORIZABLEELEMENT_OPERATION_FAILURE, message: e.message});
  }
}

export function* createColorizableElement(action) {
  try {
    yield* api.create(endpoint, action.colorizableElement, action.token);
    yield dispatch({type: actionTypes.COLORIZABLEELEMENT_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_COLORIZABLEELEMENTS});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORIZABLEELEMENT_OPERATION_FAILURE, message: e.message});
  }
}

export function* editColorizableElement(action) {
  try {
    yield* api.update(endpoint, action.newColorizableElement, action.id, action.token);
    yield dispatch({type: actionTypes.COLORIZABLEELEMENT_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_COLORIZABLEELEMENTS});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORIZABLEELEMENT_OPERATION_FAILURE, message: e.message});
  }
}

export function* deleteColorizableElement(action) {
  try {
    yield* api.remove(endpoint, action.id, action.token);
    yield dispatch({type: actionTypes.COLORIZABLEELEMENT_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_COLORIZABLEELEMENTS});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORIZABLEELEMENT_OPERATION_FAILURE, message: e.message});
  }
}
