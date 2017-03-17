'use strict';

import * as types from '../../client/src/actions/user';
import reducer from '../../client/src/reducers/user';

const INITIAL_STATE = {
  users: [], email: '', password: null, token: null, loading: false, error: null
};

describe('user reducer', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(INITIAL_STATE)
  });

  test('should handle ' + types.REMOVE_USER_TOKEN, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.REMOVE_USER_TOKEN,
        email: '',
        password: null,
        token: null,
        error: null,
        loading: false
      })).toEqual({
      ...INITIAL_STATE,
      email: '',
      password: null,
      token: null,
      error: null,
      loading: false
    });
  });

  test('should handle ' + types.GET_USER_TOKEN, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.GET_USER_TOKEN,
        email: '',
        password: null,
        token: null,
        error: null,
        loading: false
      })).toEqual({
      ...INITIAL_STATE,
      email: '',
      password: null,
      token: '',
      error: null,
      loading: true
    });
  });

  test('should handle ' + types.RESTORE_USER_TOKEN, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.RESTORE_USER_TOKEN,
        email: '',
        password: null,
        token: null,
        error: null,
        loading: false
      })).toEqual({
      ...INITIAL_STATE,
      email: '',
      password: null,
      token: null,
      error: null,
      loading: false
    });
  });

  test('should handle ' + types.GET_TOKEN_RESULT, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.GET_TOKEN_RESULT,
        email: '',
        password: null,
        token: null,
        error: null,
        loading: false
      })).toEqual({
      ...INITIAL_STATE,
      email: null,
      password: null,
      token: null,
      error: '',
      loading: false
    });
  });

  test('should handle ' + types.FETCH_USERS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_USERS
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.REGISTER_USER, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.REGISTER_USER
      })).toEqual({...INITIAL_STATE, loading: true});
  });


  test('should handle ' + types.EDIT_USER, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.EDIT_USER
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.DELETE_USER, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.DELETE_USER
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.USER_OPERATION_SUCCESS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.USER_OPERATION_SUCCESS,
        users: [{a: 1, b: 2}],
        error: null,
        loading: false
      })).toEqual({
      ...INITIAL_STATE,
      users: [{a: 1, b: 2}],
      error: null,
      loading: false
    });
  });

  test('should handle ' + types.USER_OPERATION_FAILURE, () => {
    const error = 'some error';
    expect(
      reducer(INITIAL_STATE, {
        type: types.USER_OPERATION_FAILURE,
        message: error
      })).toEqual({
      ...INITIAL_STATE, error
    });
  });
});
