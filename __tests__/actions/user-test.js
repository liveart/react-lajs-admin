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
});
