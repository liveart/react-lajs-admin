import * as actionTypes from '../actions/user';
import {dispatch} from './sagaFuncs';
import * as api from './api';

const endpoint = 'clients';

export function* fetchUsers(action) {
  try {
    const res = yield* api.retrieveAuth(endpoint, action.token);
    yield dispatch({type: actionTypes.USER_OPERATION_SUCCESS, users: res});
  } catch (e) {
    yield dispatch({type: actionTypes.USER_OPERATION_FAILURE, message: e});
  }
}

export function* registerUser(action) {
  try {
    yield* api.create(endpoint, action.user);
    yield dispatch({type: actionTypes.USER_OPERATION_SUCCESS});
  } catch (e) {
    yield dispatch({type: actionTypes.USER_OPERATION_FAILURE, message: e});
  }
}

export function* editUser(action) {
  try {
    yield* api.update(endpoint, action.newUser, action.id);
    yield dispatch({type: actionTypes.USER_OPERATION_SUCCESS});
  } catch (e) {
    yield dispatch({type: actionTypes.USER_OPERATION_FAILURE, message: e});
  }
}

export function* deleteUser(action) {
  try {
    yield* api.remove(endpoint, action.id);
    yield dispatch({type: actionTypes.USER_OPERATION_SUCCESS});
  } catch (e) {
    yield dispatch({type: actionTypes.USER_OPERATION_FAILURE, message: e});
  }
}


