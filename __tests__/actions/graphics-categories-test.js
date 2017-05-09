'use strict';

import * as F from '../../client/src/actionTypes/graphicsCategories';
import * as FF from '../../client/src/actions/graphicsCategories';

describe('Graphics categories Actions', () => {
  test('should create an action to fetch graphicsCategories', () => {
    const expectedAction = {
      type: F.FETCH_GRAPHICS_CATEGORIES
    };
    expect(FF.fetchGraphicsCategories()).toEqual(expectedAction);
  });
  test('should create an action to fetch graphicsCategory by id', () => {
    const id = '15';
    const expectedAction = {
      type: F.FETCH_GRAPHICS_CATEGORIES_BY_ID,
      id
    };
    expect(FF.fetchGraphicsCategoryById(id)).toEqual(expectedAction);
  });

  test('should create an action to graphicsCategories fontsNormal number', () => {
    const expectedAction = {
      type: F.FETCH_GRAPHICS_CATEGORIES_NUMBER
    };
    expect(FF.fetchGraphicsCategoriesNumber()).toEqual(expectedAction);
  });

  test('should create an action to create a graphicsCategory', () => {
    const graphicsCategory = {name: 'someName', thumbnail: 'img'};
    const token = 'token';
    const expectedAction = {
      type: F.CREATE_GRAPHICS_CATEGORIES,
      graphicsCategory,
      token
    };
    expect(FF.createGraphicsCategory(graphicsCategory, token)).toEqual(expectedAction);
  });

  test('should create an action to edit a graphicsCategory', () => {
    const token = 'token';
    const id = 15;
    const graphicsCategory = {name: 'someName', thumbnail: 'img'};
    const expectedAction = {
      type: F.EDIT_GRAPHICS_CATEGORY,
      id,
      newGraphicsCategory: graphicsCategory,
      token
    };
    expect(FF.editGraphicsCategory(id, graphicsCategory, token)).toEqual(expectedAction);
  });

  test('should create an action to delete a graphicsCategory', () => {
    const token = 'token';
    const id = 15;
    const expectedAction = {
      type: F.DELETE_GRAPHICS_CATEGORY,
      id,
      token
    };
    expect(FF.deleteGraphicsCategory(id, token)).toEqual(expectedAction);
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
