'use strict';

import * as types from '../../client/src/actions/fonts';
import reducer from '../../client/src/reducers/fonts';

const INITIAL_STATE = {
  fontsList: [], fontsNumber: 0, error: null, loading: false
};

describe('fonts reducer', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(INITIAL_STATE)
  });

  test('should handle ' + types.FETCH_FONTS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_FONTS
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.FETCH_FONTS_NUMBER, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_FONTS_NUMBER
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.CREATE_FONT, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.CREATE_FONT
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.EDIT_FONT, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.EDIT_FONT
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.DELETE_FONT, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.DELETE_FONT
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.FONTS_OPERATION_SUCCESS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FONTS_OPERATION_SUCCESS,
        fonts: [{a: 1, b: 2}],
        fontsNumber: 5,
        error: null,
        loading: false
      })).toEqual({
      ...INITIAL_STATE, fontsList: [{a: 1, b: 2}],
      fontsNumber: 5,
      error: null,
      loading: false
    });
  });

  test('should handle ' + types.FONTS_OPERATION_FAILURE, () => {
    const error = 'some error';
    expect(
      reducer(INITIAL_STATE, {
        type: types.FONTS_OPERATION_FAILURE,
        message: error
      })).toEqual({
      ...INITIAL_STATE, error
    });
  });
});
