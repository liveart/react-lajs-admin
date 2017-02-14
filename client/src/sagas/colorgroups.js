import * as actionTypes from '../actionTypes/colors';
import {put} from "redux-saga/effects";

function* fetchColors() {
  try {
    const req = yield fetch('/api/fonts');
    const json = yield req.json();
    yield put({type: actionTypes.COLOR_OPERATION_SUCCESS, fonts: json});
  } catch (e) {
    yield put({type: actionTypes.COLOR_OPERATION_FAILURE, message: e.statusText});
  }
}

function* fetchColorsNumber() {
  try {
    const req = yield fetch('/api/fonts/count');
    const json = yield req.json();
    yield put({type: actionTypes.COLOR_OPERATION_SUCCESS, fontsNumber: json.count});
  } catch (e) {
    yield put({type: actionTypes.COLOR_OPERATION_FAILURE, message: e.statusText});
  }
}

export function* createColor(action) {
  try {
    const req = yield fetch('/api/colors', {
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
    const req = yield fetch('/api/fonts/' + action.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action.newFont)
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
    const req = yield fetch('/api/fonts/' + action.id, {
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
