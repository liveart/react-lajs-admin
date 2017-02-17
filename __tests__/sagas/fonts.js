'use strict';
import * as actionTypes from '../../client/src/actionTypes/fonts';
import * as sagas from '../../client/src/sagas/fonts';
import * as api from '../../client/src/sagas/api';
import * as mockApi from './Mocks';

describe('fonts saga', () => {
  test('should process creating', () => {
    const g = sagas.createFont({font: {}});
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_OPERATION_SUCCESS);
  });

  test('should process creating with error', () => {
    const g = sagas.createFont();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_OPERATION_FAILURE);
  });

  test('should process fetching', () => {
    const g = sagas.fetchFonts();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_OPERATION_SUCCESS);
  });

  test('should process fetching number', () => {
    const g = sagas.fetchFontsNumber();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_OPERATION_SUCCESS);
  });

  test('should process editing', () => {
    const g = sagas.editFont({font: {}});
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_OPERATION_SUCCESS);
  });

  test('should process editing with error', () => {
    const g = sagas.editFont();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_OPERATION_FAILURE);
  });

  test('should process deleting', () => {
    const g = sagas.deleteFont({color: {}});
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_OPERATION_SUCCESS);
  });

  test('should process deleting with error', () => {
    const g = sagas.deleteFont();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_OPERATION_FAILURE);
  });



});
