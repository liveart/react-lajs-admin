'use strict';

import * as F from '../../client/src/actionTypes/productsCategories';
import * as FF from '../../client/src/actions/productsCategories';

describe('Products categories Actions', () => {
  test('should create an action to fetch productsCategories', () => {
    const expectedAction = {
      type: F.FETCH_PRODUCTS_CATEGORIES
    };
    expect(FF.fetchProductsCategories()).toEqual(expectedAction);
  });
  test('should create an action to fetch productsCategory by id', () => {
    const id = '15';
    const expectedAction = {
      type: F.FETCH_PRODUCTS_CATEGORIES_BY_ID,
      id
    };
    expect(FF.fetchProductsCategoryById(id)).toEqual(expectedAction);
  });

  test('should create an action to productsCategories fonts number', () => {
    const expectedAction = {
      type: F.FETCH_PRODUCTS_CATEGORIES_NUMBER
    };
    expect(FF.fetchProductsCategoriesNumber()).toEqual(expectedAction);
  });

  test('should create an action to create a productsCategory', () => {
    const productsCategory = {name: 'someName', thumbnail: 'img'};
    const token = 'token';
    const expectedAction = {
      type: F.CREATE_PRODUCTS_CATEGORIES,
      productsCategory,
      token
    };
    expect(FF.createProductsCategory(productsCategory, token)).toEqual(expectedAction);
  });

  test('should create an action to edit a productsCategory', () => {
    const token = 'token';
    const id = 15;
    const productsCategory = {name: 'someName', thumbnail: 'img'};
    const expectedAction = {
      type: F.EDIT_PRODUCTS_CATEGORY,
      id,
      newProductsCategory: productsCategory,
      token
    };
    expect(FF.editProductsCategory(id, productsCategory, token)).toEqual(expectedAction);
  });

  test('should create an action to delete a productsCategory', () => {
    const token = 'token';
    const id = 15;
    const expectedAction = {
      type: F.DELETE_PRODUCTS_CATEGORY,
      id,
      token
    };
    expect(FF.deleteProductsCategory(id, token)).toEqual(expectedAction);
  });
  test('should create an action to upload a file', () => {
    const thumb = "thumb";
    const expectedAction = {
      type: F.UPLOAD_THUMBNAIL,
      thumbnail: thumb
    };
    expect(FF.uploadThumbnail(thumb)).toEqual(expectedAction);
  });
});
