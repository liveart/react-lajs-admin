'use strict';
import * as actionTypes from '../../client/src/actionTypes/graphics';
import * as sagas from '../../client/src/sagas/graphics';
import * as sagaFuncs from '../../client/src/sagas/sagaFuncs';
import * as mockApi from './Mocks';

sagaFuncs.dispatch = jest.fn().mockImplementation(state => state);

describe('graphics saga', () => {
  test('should process creating', () => {
    expect([...sagas.createGraphic({graphic: {}})].pop().type).not.toEqual(actionTypes.GRAPHIC_OPERATION_FAILURE);
  });

  test('should process creating with error', () => {
    expect([...sagas.createGraphic()].pop().type).toEqual(actionTypes.GRAPHIC_OPERATION_FAILURE);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchGraphics()].pop().type).toEqual(actionTypes.GRAPHIC_OPERATION_SUCCESS);
  });

  test('should process fetching number', () => {
    expect([...sagas.fetchGraphicsNumber()].pop().type).toEqual(actionTypes.GRAPHIC_OPERATION_SUCCESS);
  });

  test('should process editing', () => {
    expect([...sagas.editGraphic({
      id: '',
      newGraphic: {}
    })].pop().type).not.toEqual(actionTypes.GRAPHIC_OPERATION_FAILURE);
  });

  test('should process editing with error', () => {
    expect([...sagas.editGraphic()].pop().type).toEqual(actionTypes.GRAPHIC_OPERATION_FAILURE);
  });

  test('should process deleting with error', () => {
    expect([...sagas.deleteGraphic()].pop().type).toEqual(actionTypes.GRAPHIC_OPERATION_FAILURE);
  });
});
