'use strict';

import * as U from '../../client/src/actions/user';

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

  test('should create an action to enable editing', () => {
    const expectedAction = {
      type: U.REMOVE_USER_TOKEN
    };
    expect(U.removeUserToken()).toEqual(expectedAction);
  });

  test('should create an action to fetch users', () => {
    const expectedAction = {
      type: U.FETCH_USERS
    };
    expect(U.fetchUsers()).toEqual(expectedAction);
  });

  test('should create an action to register user', () => {
    const expectedAction = {
      type: U.REGISTER_USER
    };
    expect(U.registerUser()).toEqual(expectedAction);
  });

  test('should create an action to edit user', () => {
    const id = 15;
    const expectedAction = {
      type: U.EDIT_USER,
      id
    };
    expect(U.editUser(id)).toEqual(expectedAction);
  });

  test('should create an action to delete user', () => {
    const id = 15;
    const expectedAction = {
      type: U.DELETE_USER,
      id
    };
    expect(U.deleteUser(id)).toEqual(expectedAction);
  });
});
