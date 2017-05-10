'use strict';

import * as types from '../../client/src/actionTypes/products';
import reducer from '../../client/src/reducers/products';

const INITIAL_STATE = {
  products: [], productsNumber: 0, productsError: null, productsMessage: null, productsLoading: false
};

describe('products reducer', () => {
  test('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(INITIAL_STATE)
  });

  test('should handle ' + types.FETCH_PRODUCTS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_PRODUCTS
      })).toEqual({...INITIAL_STATE, productsLoading: true});
  });

  test('should handle ' + types.FETCH_PRODUCTS_NUMBER, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.FETCH_PRODUCTS_NUMBER
      })).toEqual({...INITIAL_STATE, productsLoading: true});
  });

  test('should handle ' + types.CREATE_PRODUCT, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.CREATE_PRODUCT
      })).toEqual({...INITIAL_STATE, productsLoading: true});
  });

  test('should handle ' + types.EDIT_PRODUCT, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.EDIT_PRODUCT
      })).toEqual({...INITIAL_STATE, productsLoading: true});
  });

  test('should handle ' + types.DELETE_PRODUCT, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.DELETE_PRODUCT
      })).toEqual({...INITIAL_STATE, productsLoading: true});
  });

  test('should handle ' + types.PRODUCT_OPERATION_SUCCESS, () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.PRODUCT_OPERATION_SUCCESS,
        products: [{a: 1, b: 2}],
        productsNumber: 5,
        productsError: null,
        productsLoading: false
      })).toEqual({
      ...INITIAL_STATE,
      products: [{a: 1, b: 2}],
      productsNumber: 5, productsError: null,
      productsLoading: false
    });
  });

  test('should handle ' + types.PRODUCT_OPERATION_FAILURE, () => {
    const productsError = 'some error';
    expect(
      reducer(INITIAL_STATE, {
        type: types.PRODUCT_OPERATION_FAILURE,
        message: productsError
      })).toEqual({
      ...INITIAL_STATE, productsError
    });
  });
});
