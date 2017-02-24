'use strict';
import * as actionTypes from '../../client/src/actionTypes/fonts';
import * as sagas from '../../client/src/sagas/fonts';
import * as sagaFuncs from '../../client/src/sagas/sagaFuncs';
import * as mockApi from './Mocks';

sagaFuncs.dispatch = jest.fn().mockImplementation(state => state);

describe('fonts saga', () => {
  test('should process creating', () => {
    expect([...sagas.createFont({font: {}})].pop().type).toEqual(actionTypes.FONTS_OPERATION_SUCCESS);
  });

  test('should process creating with error', () => {
    expect([...sagas.createFont()].pop().type).toEqual(actionTypes.FONTS_OPERATION_FAILURE);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchFonts()].pop().type).toEqual(actionTypes.FONTS_OPERATION_SUCCESS);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchFontById({id: 0})].pop().type).toEqual(actionTypes.FONTS_OPERATION_SUCCESS);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchFontById()].pop().type).toEqual(actionTypes.FONTS_OPERATION_FAILURE);
  });

  test('should process fetching number', () => {
    expect([...sagas.fetchFontsNumber()].pop().type).toEqual(actionTypes.FONTS_OPERATION_SUCCESS);
  });

  test('should process editing', () => {
    expect([...sagas.editFont({id: 0, font: {}})].pop().type).toEqual(actionTypes.FONTS_OPERATION_SUCCESS);
  });

  test('should process editing with error', () => {
    expect([...sagas.editFont()].pop().type).toEqual(actionTypes.FONTS_OPERATION_FAILURE);
  });

  test('should process deleting', () => {
    expect([...sagas.deleteFont({id: 0})].pop().type).toEqual(actionTypes.FONTS_OPERATION_SUCCESS);
  });

  test('should process deleting with error', () => {
    expect([...sagas.deleteFont()].pop().type).toEqual(actionTypes.FONTS_OPERATION_FAILURE);
  });
  test('should process uploading', () => {
    expect([...sagas.uploadFontFile({fileWOFF: {}})].pop().type).toEqual(actionTypes.FONTS_OPERATION_SUCCESS);
  });

  test('should process uploading with error', () => {
    expect([...sagas.uploadFontFile()].pop().type).toEqual(actionTypes.FONTS_OPERATION_FAILURE);
  });
  test('should process uploading', () => {
    expect([...sagas.uploadVectors({vector: {}})].pop().type).toEqual(actionTypes.FONTS_OPERATION_SUCCESS);
  });

  test('should process uploading with error', () => {
    expect([...sagas.uploadVectors()].pop().type).toEqual(actionTypes.FONTS_OPERATION_FAILURE);
  });
});
