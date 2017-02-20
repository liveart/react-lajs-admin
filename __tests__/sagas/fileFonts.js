'use strict';
import * as mockApi from './Mocks';
import * as actionTypes from '../../client/src/actionTypes/fontFiles';
import * as sagas from '../../client/src/sagas/fontFiles';
import * as sagaFuncs from '../../client/src/sagas/sagaFuncs';

sagaFuncs.dispatch = jest.fn().mockImplementation(state => state);

describe('fontFiles saga', () => {
  test('should process creating', () => {
    expect([...sagas.createFontFile({fontFile: {}})].pop().type).toEqual(actionTypes.FONTS_FILE_OPERATION_SUCCESS);
  });

  test('should process creating with error', () => {
    expect([...sagas.createFontFile()].pop().type).toEqual(actionTypes.FONTS_FILE_OPERATION_FAILURE);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchFontFiles()].pop().type).toEqual(actionTypes.FONTS_FILE_OPERATION_SUCCESS);
  });

  test('should process fetching number', () => {
    expect([...sagas.fetchFontFilesNumber()].pop().type).toEqual(actionTypes.FONTS_FILE_OPERATION_SUCCESS);
  });

  test('should process editing', () => {
    expect([...sagas.editFontFile({id: 0, newFontFile: {}})].pop().type).toEqual(actionTypes.FONTS_FILE_OPERATION_SUCCESS);
  });

  test('should process editing with error', () => {
    expect([...sagas.editFontFile()].pop().type).toEqual(actionTypes.FONTS_FILE_OPERATION_FAILURE);
  });

  test('should process deleting', () => {
    expect([...sagas.deleteFontFile({id: 0})].pop().type).toEqual(actionTypes.FONTS_FILE_OPERATION_SUCCESS);
  });

  test('should process deleting with error', () => {
    expect([...sagas.deleteFontFile()].pop().type).toEqual(actionTypes.FONTS_FILE_OPERATION_FAILURE);
  });

  test('should process uploading', () => {
    expect([...sagas.createFontFile({fileWOFF: {}})].pop().type).toEqual(actionTypes.FONTS_FILE_OPERATION_SUCCESS);
  });

  test('should process uploading with error', () => {
    expect([...sagas.createFontFile()].pop().type).toEqual(actionTypes.FONTS_FILE_OPERATION_FAILURE);
  });
});
