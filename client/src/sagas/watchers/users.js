import {takeLatest} from 'redux-saga';
import * as actionTypes from '../../actions/user';
import * as fontsSagas from '../users';

export function* watchFetchUsers() {
  yield takeLatest(actionTypes.FETCH_USERS, fontsSagas.fetchUsers);
}

export function* watchRegisterUser() {
  yield takeLatest(actionTypes.REGISTER_USER, fontsSagas.registerUser);
}

export function* watchEditUser() {
  yield takeLatest(actionTypes.EDIT_USER, fontsSagas.editUser);
}

export function* watchDeleteUser() {
  yield takeLatest(actionTypes.DELETE_USER, fontsSagas.deleteUser);
}
