'use strict';

import * as mockApi from './Mocks';

import * as actionTypes from '../../client/src/actionTypes/colors';
import * as sagas from '../../client/src/sagas/colors';
import * as sagaFuncs from '../../client/src/sagas/sagaFuncs';

sagaFuncs.dispatch = jest.fn().mockImplementation(state => state);

describe('color saga', () => {
  test('should process creating', () => {
    expect([...sagas.createColor({color: {}})].pop().type).toEqual(actionTypes.COLOR_OPERATION_SUCCESS);
  });

  test('should process creating with error', () => {
    expect([...sagas.createColor()].pop().type).toEqual(actionTypes.COLOR_OPERATION_FAILURE);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchColors()].pop().type).toEqual(actionTypes.COLOR_OPERATION_SUCCESS);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchColorById({id: 0})].pop().type).toEqual(actionTypes.COLOR_OPERATION_SUCCESS);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchColorById()].pop().type).toEqual(actionTypes.COLOR_OPERATION_FAILURE);
  });

  test('should process fetching number', () => {
    expect([...sagas.fetchColorsNumber()].pop().type).toEqual(actionTypes.COLOR_OPERATION_SUCCESS);
  });

  test('should process editing', () => {
    expect([...sagas.editColor({id: 0, newColor: {}})].pop().type).toEqual(actionTypes.COLOR_OPERATION_SUCCESS);
  });

  test('should process editing with error', () => {
    expect([...sagas.editColor()].pop().type).toEqual(actionTypes.COLOR_OPERATION_FAILURE);
  });

  test('should process deleting', () => {
    expect([...sagas.deleteColor({id: 0})].pop().type).toEqual(actionTypes.COLOR_OPERATION_SUCCESS);
  });

  test('should process deleting with error', () => {
    expect([...sagas.deleteColor()].pop().type).toEqual(actionTypes.COLOR_OPERATION_FAILURE);
  });

});
