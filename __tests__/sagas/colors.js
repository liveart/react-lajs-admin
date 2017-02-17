'use strict';

import * as mockApi from './Mocks';

import * as actionTypes from '../../client/src/actionTypes/colors';
import * as sagas from '../../client/src/sagas/colors';

import * as api from '../../client/src/sagas/api';

const DISPATCHING = 'dispatching';


describe('color saga', () => {
  test('should process creating', () => {
    const g = sagas.createColor({color: {}});
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.COLOR_OPERATION_SUCCESS);
  });

  test('should process creating with error', () => {
    const g = sagas.createColor();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.COLOR_OPERATION_FAILURE);
  });

  test('should process fetching', () => {
    const g = sagas.fetchColors();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.COLOR_OPERATION_SUCCESS);
  });

  test('should process fetching number', () => {
    const g = sagas.fetchColorsNumber();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.COLOR_OPERATION_SUCCESS);
  });

  test('should process editing', () => {
    const g = sagas.editColor({color: {}});
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.COLOR_OPERATION_SUCCESS);
  });

  test('should process editing with error', () => {
    const g = sagas.editColor();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.COLOR_OPERATION_FAILURE);
  });

  test('should process deleting', () => {
    const g = sagas.deleteColor({color: {}});
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.COLOR_OPERATION_SUCCESS);
  });

  test('should process deleting with error', () => {
    const g = sagas.deleteColor();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.COLOR_OPERATION_FAILURE);
  });

});
