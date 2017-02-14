'use strict';

import * as types from '../../client/src/actions/colors';
import reducer from '../../client/src/reducers/colors';

const INITIAL_STATE = {
  colors: [], colorsNumber: 0, error: null, loading: false
};

describe('colors reducer', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(INITIAL_STATE)
  });

  test('should handle ' + types.FETCH_COLORS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_COLORS
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.FETCH_COLORS_NUMBER, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_COLORS_NUMBER
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.CREATE_COLOR, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.CREATE_COLOR
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.EDIT_COLOR, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.EDIT_COLOR
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.DELETE_COLOR, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.DELETE_COLOR
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.COLOR_OPERATION_SUCCESS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.COLOR_OPERATION_SUCCESS,
        colors: [{a: 1, b: 2}],
        colorsNumber: 5,
        error: null,
        loading: false
      })).toEqual({
      ...INITIAL_STATE,
      colors: [{a: 1, b: 2}],
      colorsNumber: 5,
      error: null,
      loading: false
    });
  });

  test('should handle ' + types.COLOR_OPERATION_FAILURE, () => {
    const error = 'some error';
    expect(
      reducer(INITIAL_STATE, {
        type: types.COLOR_OPERATION_FAILURE,
        message: error
      })).toEqual({
      ...INITIAL_STATE, error
    });
  });
});
