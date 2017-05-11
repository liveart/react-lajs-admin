'use strict';

import * as F from '../../client/src/actionTypes/products';
import * as FF from '../../client/src/actions/products';

describe('Product Actions', () => {
  test('should create an action to fetch products', () => {
    const expectedAction = {
      type: F.FETCH_PRODUCTS
    };
    expect(FF.fetchProducts()).toEqual(expectedAction);
  });

  test('should create an action to fetch products number', () => {
    const expectedAction = {
      type: F.FETCH_PRODUCTS_NUMBER
    };
    expect(FF.fetchProductsNumber()).toEqual(expectedAction);
  });

  test('should create an action to create a product', () => {
    const product = {
      name: 'string',
      categoryId: 'string',
      thumbUrl: 'string',
      description: 'string',
      data: {},
      minDPU: 0,
      minQuantity: 0,
      multicolor: false,
      colorizables: [],
      colors: [],
      hideEditableAreaBorder: false,
      namesNumbersEnabled: false,
      pantones: {
        useForDecoration: true,
        useForProduct: true
      },
      resizable: false,
      editableAreaSizes: [],
      showRuler: false,
      sizes: [],
      locations: [],
      template: 'string'
    };
    const token = 'token';
    const expectedAction = {
      type: F.CREATE_PRODUCT,
      product,
      token
    };
    expect(FF.createProduct(product, token)).toEqual(expectedAction);
  });

  test('should create an action to edit a product', () => {
    const token = 'token';
    const id = 15;
    const product = {
      name: 'string',
      description: 'string',
      categoryId: 'string',
      colors: [],
      colorizables: [],
      colorize: false,
      multicolor: false,
      thumb: 'string',
      image: 'string'
    };
    const expectedAction = {
      type: F.EDIT_PRODUCT,
      id,
      newProduct: product,
      token
    };
    expect(FF.editProduct(id, product, token)).toEqual(expectedAction);
  });

  test('should create an action to delete a product', () => {
    const token = 'token';
    const id = 15;
    const expectedAction = {
      type: F.DELETE_PRODUCT,
      id,
      token
    };
    expect(FF.deleteProduct(id, token)).toEqual(expectedAction);
  });
});
