'use strict';

import * as mockApi from './Mocks';

import * as actionTypes from '../../client/src/actionTypes/colorgroups';
import * as sagas from '../../client/src/sagas/colorgroups';
import * as sagaFuncs from '../../client/src/sagas/sagaFuncs';

sagaFuncs.dispatch = jest.fn().mockImplementation(state => state);

describe('color saga', () => {
  test('should process creating', () => {
    expect([...sagas.createColorgroup({colorgroup: {}})].pop().type).not.toEqual(actionTypes.COLORGROUP_OPERATION_FAILURE);
  });

  test('should process creating with error', () => {
    expect([...sagas.createColorgroup()].pop().type).toEqual(actionTypes.COLORGROUP_OPERATION_FAILURE);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchColorgroups()].pop().type).toEqual(actionTypes.COLORGROUP_OPERATION_SUCCESS);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchColorgroupById({id: 0})].pop().type).toEqual(actionTypes.COLORGROUP_OPERATION_SUCCESS);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchColorgroupById()].pop().type).toEqual(actionTypes.COLORGROUP_OPERATION_FAILURE);
  });

  test('should process fetching number', () => {
    expect([...sagas.fetchColorgroupsNumber()].pop().type).toEqual(actionTypes.COLORGROUP_OPERATION_SUCCESS);
  });

  test('should process editing', () => {
    expect([...sagas.editColorgroup({id: 0, newColor: {}})].pop().type).not.toEqual(actionTypes.COLORGROUP_OPERATION_FAILURE);
  });

  test('should process editing with error', () => {
    expect([...sagas.editColorgroup()].pop().type).toEqual(actionTypes.COLORGROUP_OPERATION_FAILURE);
  });

  test('should process deleting', () => {
    expect([...sagas.deleteColorgroup({id: 0})].pop().type).not.toEqual(actionTypes.COLORGROUP_OPERATION_FAILURE);
  });

  test('should process deleting with error', () => {
    expect([...sagas.deleteColorgroup()].pop().type).toEqual(actionTypes.COLORGROUP_OPERATION_FAILURE);
  });

});
