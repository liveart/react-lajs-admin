'use strict';

import * as types from '../../client/src/actionTypes/graphics';
import reducer from '../../client/src/reducers/graphics';

const INITIAL_STATE = {
  graphics: [], graphicsNumber: 0, graphicsError: null, graphicsMessage: null, graphicsLoading: false
};

describe('graphics reducer', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(INITIAL_STATE)
  });

  test('should handle ' + types.FETCH_GRAPHICS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_GRAPHICS
      })).toEqual({...INITIAL_STATE, graphicsLoading: true});
  });

  test('should handle ' + types.FETCH_GRAPHICS_NUMBER, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_GRAPHICS_NUMBER
      })).toEqual({...INITIAL_STATE, graphicsLoading: true});
  });

  test('should handle ' + types.CREATE_GRAPHIC, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.CREATE_GRAPHIC
      })).toEqual({...INITIAL_STATE, graphicsLoading: true});
  });

  test('should handle ' + types.EDIT_GRAPHIC, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.EDIT_GRAPHIC
      })).toEqual({...INITIAL_STATE, graphicsLoading: true});
  });

  test('should handle ' + types.DELETE_GRAPHIC, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.DELETE_GRAPHIC
      })).toEqual({...INITIAL_STATE, graphicsLoading: true});
  });

  test('should handle ' + types.GRAPHIC_OPERATION_SUCCESS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.GRAPHIC_OPERATION_SUCCESS,
        graphics: [{a: 1, b: 2}],
        graphicsNumber: 5,
        graphicsError: null,
        graphicsLoading: false
      })).toEqual({
      ...INITIAL_STATE,
      graphics: [{a: 1, b: 2}],
      graphicsNumber: 5, graphicsError: null,
      graphicsLoading: false
    });
  });

  test('should handle ' + types.GRAPHIC_OPERATION_FAILURE, () => {
    const graphicsError = 'some error';
    expect(
      reducer(INITIAL_STATE, {
        type: types.GRAPHIC_OPERATION_FAILURE,
        message: graphicsError
      })).toEqual({
      ...INITIAL_STATE, graphicsError
    });
  });
});
