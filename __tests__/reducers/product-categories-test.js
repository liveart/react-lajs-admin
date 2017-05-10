'use strict';

import * as types from '../../client/src/actionTypes/productsCategories';
import reducer from '../../client/src/reducers/productsCategories';

const INITIAL_STATE = {
  productsCategory: null,
  productsCategories: [],
  productsCategoriesNumber: 0,
  productsCategoriesError: null,
  productsCategoriesLoading: false
};

describe('productsCategories reducer', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(INITIAL_STATE)
  });

  test('should handle ' + types.FETCH_PRODUCTS_CATEGORIES, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_PRODUCTS_CATEGORIES
      })).toEqual({...INITIAL_STATE, productsCategoriesLoading: true});
  });

  test('should handle ' + types.FETCH_PRODUCTS_CATEGORIES_BY_ID, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_PRODUCTS_CATEGORIES_BY_ID
      })).toEqual({...INITIAL_STATE, productsCategoriesLoading: true});
  });

  test('should handle ' + types.FETCH_PRODUCTS_CATEGORIES_NUMBER, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_PRODUCTS_CATEGORIES_NUMBER
      })).toEqual({...INITIAL_STATE, productsCategoriesLoading: true});
  });

  test('should handle ' + types.CREATE_PRODUCTS_CATEGORIES, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.CREATE_PRODUCTS_CATEGORIES
      })).toEqual({...INITIAL_STATE, productsCategoriesLoading: true});
  });

  test('should handle ' + types.EDIT_PRODUCTS_CATEGORY, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.EDIT_PRODUCTS_CATEGORY
      })).toEqual({...INITIAL_STATE, productsCategoriesLoading: true});
  });

  test('should handle ' + types.DELETE_PRODUCTS_CATEGORY, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.DELETE_PRODUCTS_CATEGORY
      })).toEqual({...INITIAL_STATE, productsCategoriesLoading: true});
  });

  test('should handle ' + types.PRODUCTS_CATEGORY_SUCCESS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.PRODUCTS_CATEGORY_SUCCESS,
        productsCategory: {a: 1},
        productsCategories: [{a: 1, b: 2}],
        productsCategoriesNumber: 5,
        fontsError: null,
        productsCategoriesLoading: false
      })).toEqual({
      ...INITIAL_STATE,
      productsCategory: {a: 1},
      productsCategories: [{a: 1, b: 2}],
      productsCategoriesNumber: 5,
      productsCategoriesError: null,
      productsCategoriesLoading: false
    });
  });

  test('should handle ' + types.PRODUCTS_CATEGORY_FAILURE, () => {
    const productsCategoriesError = 'some error';
    expect(
      reducer(INITIAL_STATE, {
        type: types.PRODUCTS_CATEGORY_FAILURE,
        message: productsCategoriesError
      })).toEqual({
      ...INITIAL_STATE, productsCategoriesError
    });
  });
});

