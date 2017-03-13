import * as actionTypes from '../actionTypes/colorizable';
import {dispatch} from './sagaFuncs';
import * as api from './api';

const endpoint = 'colorizables';

export function* fetchColorizables(action) {
  try {
    const res = yield* api.retrieve(`graphics/${action.graphicId}/colorizableElements`);
    yield dispatch({type: actionTypes.COLORIZABLE_OPERATION_SUCCESS, colorizables: res});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORIZABLE_OPERATION_FAILURE, message: e.message});
  }
}

export function* createColorizable(action) {
  try {
    yield* api.create(endpoint, action.colorizable, action.token);
    yield dispatch({type: actionTypes.COLORIZABLE_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_COLORIZABLES});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORIZABLE_OPERATION_FAILURE, message: e.message});
  }
}

export function* editColorizable(action) {
  try {
    yield* api.update(endpoint, action.newColorizable, action.id, action.token);
    yield dispatch({type: actionTypes.COLORIZABLE_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_COLORIZABLES});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORIZABLE_OPERATION_FAILURE, message: e.message});
  }
}

export function* deleteColorizable(action) {
  try {
    yield* api.remove(endpoint, action.id, action.token);
    yield dispatch({type: actionTypes.COLORIZABLE_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_COLORIZABLES});
  } catch (e) {
    yield dispatch({type: actionTypes.COLORIZABLE_OPERATION_FAILURE, message: e.message});
  }
}
