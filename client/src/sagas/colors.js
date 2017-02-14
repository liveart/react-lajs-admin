import * as actionTypes from '../actionTypes/colors';
import {put} from 'redux-saga/effects';

const endpoint = 'colors';

export function* fetchColors() {
  try {
    const req = yield fetch('/api/' + endpoint);
    const json = yield req.json();
    yield put({type: actionTypes.COLOR_OPERATION_SUCCESS, colors: json});
  } catch (e) {
    yield put({type: actionTypes.COLOR_OPERATION_FAILURE, message: e.statusText});
  }
}

export function* fetchColorsNumber() {
  try {
    const req = yield fetch('/api/' + endpoint + '/count');
    const json = yield req.json();
    yield put({type: actionTypes.COLOR_OPERATION_SUCCESS, colorsNumber: json.count});
  } catch (e) {
    yield put({type: actionTypes.COLOR_OPERATION_FAILURE, message: e.statusText});
  }
}

export function* createColor(action) {
  try {
    const req = yield fetch('/api/' + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.color)
    });
    const json = yield req.json();
    if (!(req.status >= 200 && req.status < 300)) {
      throw new Error(json.error.message);
    }

    yield put({type: actionTypes.COLOR_OPERATION_SUCCESS});
    yield put({type: actionTypes.FETCH_COLORS});
  } catch (e) {
    yield put({type: actionTypes.COLOR_OPERATION_FAILURE, message: e.message});
  }
}

export function* editColor(action) {
  try {
    const req = yield fetch('/api/' + endpoint + '/' + action.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.newColor)
    });
    const json = yield req.json();
    if (!(req.status >= 200 && req.status < 300)) {
      throw new Error(json.error.message);
    }

    yield put({type: actionTypes.COLOR_OPERATION_SUCCESS});
    yield put({type: actionTypes.FETCH_COLORS});
  } catch (e) {
    yield put({type: actionTypes.COLOR_OPERATION_FAILURE, message: e.message});
  }
}

export function* deleteColor(action) {
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

    yield put({type: actionTypes.COLOR_OPERATION_SUCCESS});
    yield put({type: actionTypes.FETCH_COLORS});
  } catch (e) {
    yield put({type: actionTypes.COLOR_OPERATION_FAILURE, message: e.message});
  }
}
