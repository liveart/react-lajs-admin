import * as actionTypes from '../actionTypes/colorgroups';
import {put} from 'redux-saga/effects';

const endpoint = 'colorgroups';

export function* fetchColorgroups() {
  try {
    const req = yield fetch('/api/' + endpoint);
    const json = yield req.json();
    yield put({type: actionTypes.COLORGROUP_OPERATION_SUCCESS, colorgroups: json});
  } catch (e) {
    yield put({type: actionTypes.COLORGROUP_OPERATION_FAILURE, message: e.statusText});
  }
}

export function* fetchColorgroupsNumber() {
  try {
    const req = yield fetch('/api/' + endpoint + '/count');
    const json = yield req.json();
    yield put({type: actionTypes.COLORGROUP_OPERATION_SUCCESS, colorgroupsNumber: json.count});
  } catch (e) {
    yield put({type: actionTypes.COLORGROUP_OPERATION_FAILURE, message: e.statusText});
  }
}

export function* createColorgroup(action) {
  try {
    const req = yield fetch('/api/' + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.colorgroup)
    });
    const json = yield req.json();
    if (!(req.status >= 200 && req.status < 300)) {
      throw new Error(json.error.message);
    }

    yield put({type: actionTypes.COLORGROUP_OPERATION_SUCCESS});
    yield put({type: actionTypes.FETCH_COLORGROUPS});
  } catch (e) {
    yield put({type: actionTypes.COLORGROUP_OPERATION_FAILURE, message: e.message});
  }
}

export function* editColorgroup(action) {
  try {
    const req = yield fetch('/api/' + endpoint + '/' + action.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.newColorgroup)
    });
    const json = yield req.json();
    if (!(req.status >= 200 && req.status < 300)) {
      throw new Error(json.error.message);
    }

    yield put({type: actionTypes.COLORGROUP_OPERATION_SUCCESS});
    yield put({type: actionTypes.FETCH_COLORGROUPS});
  } catch (e) {
    yield put({type: actionTypes.COLORGROUP_OPERATION_FAILURE, message: e.message});
  }
}

export function* deleteColorgroup(action) {
  try {
    const req = yield fetch('/api/' + endpoint + '/' + action.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = yield req.json();
    if (!(req.status >= 200 && req.status < 300)) {
      throw new Error(json.error.message);
    }

    yield put({type: actionTypes.COLORGROUP_OPERATION_SUCCESS});
    yield put({type: actionTypes.FETCH_COLORGROUPS});
  } catch (e) {
    yield put({type: actionTypes.COLORGROUP_OPERATION_FAILURE, message: e.message});
  }
}
