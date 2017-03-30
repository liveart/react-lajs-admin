'use strict';

import * as types from '../../client/src/actionTypes/graphicsCategories';
import reducer from '../../client/src/reducers/graphicsCategories';

const INITIAL_STATE = {
  graphicsCategory: null,
  graphicsCategories: [],
  graphicsCategoriesNumber: 0,
  graphicsCategoriesError: null,
  graphicsCategoriesLoading: false,
  graphicsCategoriesMessage: null
};

describe('graphicsCategories reducer', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(INITIAL_STATE)
  });

  test('should handle ' + types.FETCH_GRAPHICS_CATEGORIES, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_GRAPHICS_CATEGORIES
      })).toEqual({...INITIAL_STATE, graphicsCategoriesLoading: true});
  });

  test('should handle ' + types.FETCH_GRAPHICS_CATEGORIES_BY_ID, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_GRAPHICS_CATEGORIES_BY_ID
      })).toEqual({...INITIAL_STATE, graphicsCategoriesLoading: true});
  });

  test('should handle ' + types.FETCH_GRAPHICS_CATEGORIES_NUMBER, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_GRAPHICS_CATEGORIES_NUMBER
      })).toEqual({...INITIAL_STATE, graphicsCategoriesLoading: true});
  });

  test('should handle ' + types.CREATE_GRAPHICS_CATEGORIES, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.CREATE_GRAPHICS_CATEGORIES
      })).toEqual({...INITIAL_STATE, graphicsCategoriesLoading: true});
  });

  test('should handle ' + types.UPLOAD_THUMBNAIL, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.UPLOAD_THUMBNAIL
      })).toEqual({...INITIAL_STATE, graphicsCategoriesLoading: true});
  });


  test('should handle ' + types.EDIT_GRAPHICS_CATEGORY, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.EDIT_GRAPHICS_CATEGORY
      })).toEqual({...INITIAL_STATE, graphicsCategoriesLoading: true});
  });

  test('should handle ' + types.DELETE_GRAPHICS_CATEGORY, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.DELETE_GRAPHICS_CATEGORY
      })).toEqual({...INITIAL_STATE, graphicsCategoriesLoading: true});
  });

  test('should handle ' + types.GRAPHICS_CATEGORY_SUCCESS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.GRAPHICS_CATEGORY_SUCCESS,
        graphicsCategory: {a: 1},
        graphicsCategories: [{a: 1, b: 2}],
        graphicsCategoriesNumber: 5,
        fontsError: null,
        graphicsCategoriesLoading: false
      })).toEqual({
      ...INITIAL_STATE,
      graphicsCategory: {a: 1},
      graphicsCategories: [{a: 1, b: 2}],
      graphicsCategoriesNumber: 5,
      graphicsCategoriesError: null,
      graphicsCategoriesLoading: false
    });
  });

  test('should handle ' + types.GRAPHICS_CATEGORY_FAILURE, () => {
    const graphicsCategoriesError = 'some error';
    expect(
      reducer(INITIAL_STATE, {
        type: types.GRAPHICS_CATEGORY_FAILURE,
        message: graphicsCategoriesError
      })).toEqual({
      ...INITIAL_STATE, graphicsCategoriesError
    });
  });
});

