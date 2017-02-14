'use strict';

import * as types from '../../client/src/actions/colorgroups';
import reducer from '../../client/src/reducers/colorgroups';

const INITIAL_STATE = {
  colorgroups: [], colorgroupsNumber: 0, error: null, loading: false
};

describe('colorgroups reducer', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(INITIAL_STATE)
  });

  test('should handle ' + types.FETCH_COLORGROUPS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_COLORGROUPS
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.FETCH_COLORGROUPS_NUMBER, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_COLORGROUPS_NUMBER
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.CREATE_COLORGROUP, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.CREATE_COLORGROUP
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.EDIT_COLORGROUP, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.EDIT_COLORGROUP
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.DELETE_COLORGROUP, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.DELETE_COLORGROUP
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + types.COLORGROUP_OPERATION_SUCCESS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.COLORGROUP_OPERATION_SUCCESS,
        colorgroups: [{a: 123, b: 456, c: {}}],
        colorgroupsNumber: 3,
        error: null,
        loading: false
      })).toEqual({
      ...INITIAL_STATE,
      colorgroups: [{a: 123, b: 456, c: {}}],
      colorgroupsNumber: 3,
      error: null,
      loading: false
    });
  });

  test('should handle ' + types.COLORGROUP_OPERATION_FAILURE, () => {
    const error = 'some error';
    expect(
      reducer(INITIAL_STATE, {
        type: types.COLORGROUP_OPERATION_FAILURE,
        message: error
      })).toEqual({
      ...INITIAL_STATE, error
    });
  });
});
