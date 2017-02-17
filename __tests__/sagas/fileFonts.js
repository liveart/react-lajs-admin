'use strict';
import * as actionTypes from '../../client/src/actionTypes/fontFiles';
import * as sagas from '../../client/src/sagas/fontFiles';
import * as api from '../../client/src/sagas/api';
import * as mockApi from './Mocks';

describe('fonts saga', () => {
  test('should process creating', () => {
    const g = sagas.createFontFile({fontFile: {}});
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_FILE_OPERATION_SUCCESS);
  });

  test('should process creating with error', () => {
    const g = sagas.createFontFile();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_FILE_OPERATION_FAILURE);
  });

  test('should process fetching', () => {
    const g = sagas.fetchFontFiles();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_FILE_OPERATION_SUCCESS);
  });

  test('should process fetching number', () => {
    const g = sagas.fetchFontFilesNumber();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_FILE_OPERATION_SUCCESS);
  });

  test('should process editing', () => {
    const g = sagas.editFontFile({font: {}});
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_FILE_OPERATION_SUCCESS);
  });

  test('should process editing with error', () => {
    const g = sagas.editFontFile();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_FILE_OPERATION_FAILURE);
  });

  test('should process deleting', () => {
    const g = sagas.deleteFontFile({color: {}});
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_FILE_OPERATION_SUCCESS);
  });

  test('should process deleting with error', () => {
    const g = sagas.deleteFontFile();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_FILE_OPERATION_FAILURE);
  });

  test('should process uploading', () => {
    const g = sagas.uploadFontFile({fileWOFF: {}});
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_FILE_OPERATION_SUCCESS);
  });

  test('should process uploading with error', () => {
    const g = sagas.uploadFontFile();
    const v = g.next().value;
    expect(v.type).toEqual(actionTypes.FONTS_FILE_OPERATION_FAILURE);
  });
});
