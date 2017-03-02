'use strict';

import * as U from '../../client/src/actions/user';

const TOKEN = 'USER_ACCESS_TOKEN';

describe('User Actions', () => {
  test('should create an action to get user token', () => {
    const email = 'user@example.com';
    const password = 'password';
    const expectedAction = {
      type: U.GET_USER_TOKEN,
      email,
      password
    };
    expect(U.getUserToken(email, password)).toEqual(expectedAction);
  });

  test('should create an action to remove user token', () => {
    const expectedAction = {
      type: U.REMOVE_USER_TOKEN
    };
    expect(U.removeUserToken()).toEqual(expectedAction);
  });

  test('should create an action to fetch users', () => {
    const expectedAction = {
      type: U.FETCH_USERS,
      token: TOKEN
    };
    expect(U.fetchUsers(TOKEN)).toEqual(expectedAction);
  });

  test('should create an action to register user', () => {
    const expectedAction = {
      type: U.REGISTER_USER,
      user: {a: 1, b: 2},
      token: TOKEN
    };
    expect(U.registerUser({a: 1, b: 2}, TOKEN)).toEqual(expectedAction);
  });

  test('should create an action to edit user', () => {
    const id = 15;
    const expectedAction = {
      type: U.EDIT_USER,
      id,
      newUser: {a: 1, b: 2},
      token: TOKEN
    };
    expect(U.editUser(id, {a: 1, b: 2}, TOKEN)).toEqual(expectedAction);
  });

  test('should create an action to delete user', () => {
    const id = 15;
    const expectedAction = {
      type: U.DELETE_USER,
      id,
      token: TOKEN
    };
    expect(U.deleteUser(id, TOKEN)).toEqual(expectedAction);
  });
});
