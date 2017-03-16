'use strict';
import * as actionTypes from '../../client/src/actions/user';
import * as sagas from '../../client/src/sagas/users';
import * as sagaFuncs from '../../client/src/sagas/sagaFuncs';
import * as mockApi from './Mocks';

sagaFuncs.dispatch = jest.fn().mockImplementation(state => state);

describe('fonts saga', () => {
  test('should process register', () => {
    expect([...sagas.registerUser({user: {}})].pop().type).not.toEqual(actionTypes.USER_OPERATION_FAILURE);
  });
  test('should process edit', () => {
    expect([...sagas.editUser({id: ''})].pop().type).not.toEqual(actionTypes.USER_OPERATION_FAILURE);
  });

  test('should process delete', () => {
    expect([...sagas.deleteUser({id: ''})].pop().type).not.toEqual(actionTypes.USER_OPERATION_FAILURE);
  });
});
