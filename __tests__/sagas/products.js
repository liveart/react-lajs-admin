'use strict';
import * as actionTypes from '../../client/src/actionTypes/products';
import * as sagas from '../../client/src/sagas/products';
import * as sagaFuncs from '../../client/src/sagas/sagaFuncs';
import * as mockApi from './Mocks';

sagaFuncs.dispatch = jest.fn().mockImplementation(state => state);

describe('products saga', () => {
  test('should process creating', () => {
    expect([...sagas.createProduct({product: {}})].pop().type).not.toEqual(actionTypes.PRODUCT_OPERATION_FAILURE);
  });

  test('should process creating with error', () => {
    expect([...sagas.createProduct()].pop().type).toEqual(actionTypes.PRODUCT_OPERATION_FAILURE);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchProducts()].pop().type).toEqual(actionTypes.PRODUCT_OPERATION_SUCCESS);
  });

  test('should process fetching number', () => {
    expect([...sagas.fetchProductsNumber()].pop().type).toEqual(actionTypes.PRODUCT_OPERATION_SUCCESS);
  });

  test('should process editing', () => {
    expect([...sagas.editProduct({
      id: '',
      newProduct: {}
    })].pop().type).not.toEqual(actionTypes.PRODUCT_OPERATION_FAILURE);
  });

  test('should process editing with error', () => {
    expect([...sagas.editProduct()].pop().type).toEqual(actionTypes.PRODUCT_OPERATION_FAILURE);
  });

  test('should process deleting with error', () => {
    expect([...sagas.deleteProduct()].pop().type).toEqual(actionTypes.PRODUCT_OPERATION_FAILURE);
  });
});
