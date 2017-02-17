'use strict';

import * as types from '../../client/src/actionTypes/fontFiles';
import reducer from '../../client/src/reducers/fontFiles';

const INITIAL_STATE = {
  fontFilesList: [], fontFilesNumber: 0, fontFilesError: null, fontFilesLoading: false
};

describe('fonts reducer', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(INITIAL_STATE)
  });

  test('should handle ' + types.FETCH_FONT_FILES, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_FONT_FILES
      })).toEqual({...INITIAL_STATE, fontFilesLoading: true});
  });

  test('should handle ' + types.FETCH_FONT_FILES_NUMBER, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_FONT_FILES_NUMBER
      })).toEqual({...INITIAL_STATE, fontFilesLoading: true});
  });

  test('should handle ' + types.CREATE_FONT_FILE, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.CREATE_FONT_FILE
      })).toEqual({...INITIAL_STATE, fontFilesLoading: true});
  });

  test('should handle ' + types.UPLOAD_FONT_FILE, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.UPLOAD_FONT_FILE
      })).toEqual({...INITIAL_STATE, fontFilesLoading: true});
  });

  test('should handle ' + types.EDIT_FONT_FILE, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.EDIT_FONT_FILE
      })).toEqual({...INITIAL_STATE, fontFilesLoading: true});
  });

  test('should handle ' + types.DELETE_FONT_FILE, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.DELETE_FONT_FILE
      })).toEqual({...INITIAL_STATE, fontFilesLoading: true});
  });

  test('should handle ' + types.FONTS_FILE_OPERATION_SUCCESS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FONTS_FILE_OPERATION_SUCCESS,
        fontFiles: [{a: 1, b: 2}],
        fontFilesNumber: 5,
        fontFilesError: null,
        fontFilesLoading: false
      })).toEqual({
      ...INITIAL_STATE, fontFilesList: [{a: 1, b: 2}],
      fontFilesNumber: 5,
      fontFilesError: null,
      fontFilesLoading: false
    });
  });

  test('should handle ' + types.FONTS_FILE_OPERATION_FAILURE, () => {
    const fontFilesError = 'some error';
    expect(
      reducer(INITIAL_STATE, {
        type: types.FONTS_FILE_OPERATION_FAILURE,
        message: fontFilesError
      })).toEqual({
      ...INITIAL_STATE, fontFilesError
    });
  });
});
