import {takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../../actions/user';
import * as sagas from '../users';

export function* watchFetchUsers() {
  yield takeLatest(actionTypes.FETCH_USERS, sagas.fetchUsers);
}

export function* watchRegisterUser() {
  yield takeLatest(actionTypes.REGISTER_USER, sagas.registerUser);
}

export function* watchEditUser() {
  yield takeLatest(actionTypes.EDIT_USER, sagas.editUser);
}

export function* watchDeleteUser() {
  yield takeLatest(actionTypes.DELETE_USER, sagas.deleteUser);
}

export function* watchGetUserToken() {
  yield takeLatest(actionTypes.GET_USER_TOKEN, sagas.getUserToken);
}

export function* watchValidateToken() {
  yield takeLatest(actionTypes.VALIDATE_TOKEN, sagas.validateToken);
}
