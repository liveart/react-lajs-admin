'use strict';
import * as actionTypes from '../../client/src/actionTypes/productsCategories';
import * as sagas from '../../client/src/sagas/productsCategories';
import * as sagaFuncs from '../../client/src/sagas/sagaFuncs';
import * as mockApi from './Mocks';

sagaFuncs.dispatch = jest.fn().mockImplementation(state => state);

describe('productsCategories saga', () => {
  test('should process creating', () => {
    expect([...sagas.createProductsCategory({productsCategory: {}})].pop().type).not.toEqual(actionTypes.PRODUCTS_CATEGORY_FAILURE);
  });

  test('should process creating with error', () => {
    expect([...sagas.createProductsCategory()].pop().type).toEqual(actionTypes.PRODUCTS_CATEGORY_FAILURE);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchProductsCategories()].pop().type).toEqual(actionTypes.PRODUCTS_CATEGORY_SUCCESS);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchProductsCategoryById({id: 0})].pop().type).toEqual(actionTypes.PRODUCTS_CATEGORY_SUCCESS);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchProductsCategoryById()].pop().type).toEqual(actionTypes.PRODUCTS_CATEGORY_FAILURE);
  });

  test('should process fetching number', () => {
    expect([...sagas.fetchProductsCategoriesNumber()].pop().type).toEqual(actionTypes.PRODUCTS_CATEGORY_SUCCESS);
  });

  test('should process editing with error', () => {
    expect([...sagas.editProductsCategory()].pop().type).toEqual(actionTypes.PRODUCTS_CATEGORY_FAILURE);
  });

  test('should process editing', () => {
    expect([...sagas.editProductsCategory({id: '', newProductsCategory: {}})].pop().type).not.toEqual(actionTypes.PRODUCTS_CATEGORY_FAILURE);
  });

  test('should process deleting with error', () => {
    expect([...sagas.deleteProductsCategory()].pop().type).toEqual(actionTypes.PRODUCTS_CATEGORY_FAILURE);
  });

  test('should process uploading with error', () => {
    expect([...sagas.uploadThumbnail()].pop().type).toEqual(actionTypes.PRODUCTS_CATEGORY_FAILURE);
  });
});
