'use strict';

import * as actions from '../../client/src/actions/colorgroups';
import * as actionTypes from '../../client/src/actionTypes/colorgroups';
import reducer from '../../client/src/reducers/colorgroups';

const INITIAL_STATE = {
  colorgroup: null, colorgroups: [], colorgroupsNumber: 0, error: null, loading: false
};

describe('colorgroups reducer', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(INITIAL_STATE)
  });

  test('should handle ' + actionTypes.FETCH_COLORGROUPS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: actionTypes.FETCH_COLORGROUPS
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + actionTypes.FETCH_COLORGROUP_BY_ID, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: actionTypes.FETCH_COLORGROUP_BY_ID
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + actionTypes.FETCH_COLORGROUPS_NUMBER, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: actionTypes.FETCH_COLORGROUPS_NUMBER
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + actionTypes.CREATE_COLORGROUP, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: actionTypes.CREATE_COLORGROUP
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + actionTypes.EDIT_COLORGROUP, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: actionTypes.EDIT_COLORGROUP
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + actionTypes.DELETE_COLORGROUP, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: actionTypes.DELETE_COLORGROUP
      })).toEqual({...INITIAL_STATE, loading: true});
  });

  test('should handle ' + actionTypes.COLORGROUP_OPERATION_SUCCESS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: actionTypes.COLORGROUP_OPERATION_SUCCESS,
        colorgroup: {a: 123},
        colorgroups: [{a: 123, b: 456, c: {}}],
        colorgroupsNumber: 3,
        error: null,
        loading: false
      })).toEqual({
      ...INITIAL_STATE,
      colorgroup: {a: 123},
      colorgroups: [{a: 123, b: 456, c: {}}],
      colorgroupsNumber: 3,
      error: null,
      loading: false
    });
  });

  test('should handle ' + actionTypes.COLORGROUP_OPERATION_FAILURE, () => {
    const error = 'some error';
    expect(
      reducer(INITIAL_STATE, {
        type: actionTypes.COLORGROUP_OPERATION_FAILURE,
        message: error
      })).toEqual({
      ...INITIAL_STATE, error
    });
  });
});
