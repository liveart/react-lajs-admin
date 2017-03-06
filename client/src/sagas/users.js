import * as actionTypes from '../actions/user';
import {dispatch} from './sagaFuncs';
import * as api from './api';

const endpoint = 'clients';

export function* fetchUsers(action) {
  try {
    const res = yield* api.retrieveAuth(endpoint, action.token);
    yield dispatch({type: actionTypes.USER_OPERATION_SUCCESS, users: res});
  } catch (e) {
    yield dispatch({type: actionTypes.USER_OPERATION_FAILURE, message: e.message});
  }
}

export function* registerUser(action) {
  try {
    yield* api.create(endpoint, action.user, action.token);
    yield dispatch({type: actionTypes.USER_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_USERS, token: action.token});
  } catch (e) {
    yield dispatch({type: actionTypes.USER_OPERATION_FAILURE, message: e.message});
  }
}

export function* getUserToken(action) {
  try {
    const req = yield fetch('/api/clients/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: action.email, password: action.password})
    });
    const json = yield req.json();
    if (!(req.status >= 200 && req.status < 300)) {
      throw new Error(json.error.message);
    }

    yield dispatch({type: actionTypes.USER_OPERATION_SUCCESS, token: json.id});
  } catch (e) {
    yield dispatch({type: actionTypes.USER_OPERATION_FAILURE, message: e.message});
  }
}

export function* validateToken(action) {
  try {
    const req = yield fetch('/api/verify', {
      headers: {
        'Authorization': action.token
      }
    });
    if (!(req.status >= 200 && req.status < 300)) {
      throw req.statusText;
    }
    const validated = yield req.json();
    if (!validated.token) {
      yield dispatch({type: actionTypes.TOKEN_VALIDATION_FAILURE});
    }
  } catch (e) {
    yield dispatch({type: actionTypes.USER_OPERATION_FAILURE, message: e});
  }
}

export function* editUser(action) {
  try {
    yield* api.update(endpoint, action.newUser, action.id, action.token);
    yield dispatch({type: actionTypes.USER_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_USERS, token: action.token});
  } catch (e) {
    yield dispatch({type: actionTypes.USER_OPERATION_FAILURE, message: e.message});
  }
}

export function* deleteUser(action) {
  try {
    yield* api.remove(endpoint, action.id, action.token);
    yield dispatch({type: actionTypes.USER_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_USERS, token: action.token});
  } catch (e) {
    yield dispatch({type: actionTypes.USER_OPERATION_FAILURE, message: e.message});
  }
}


