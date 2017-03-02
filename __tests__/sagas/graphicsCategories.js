'use strict';
import * as actionTypes from '../../client/src/actionTypes/graphicsCategories';
import * as sagas from '../../client/src/sagas/graphicsCategories';
import * as sagaFuncs from '../../client/src/sagas/sagaFuncs';
import * as mockApi from './Mocks';

sagaFuncs.dispatch = jest.fn().mockImplementation(state => state);

describe('graphicsCategories saga', () => {
  test('should process creating', () => {
    expect([...sagas.createGraphicsCategory({graphicsCategory: {}})].pop().type).not.toEqual(actionTypes.GRAPHICS_CATEGORY_FAILURE);
  });

  test('should process creating with error', () => {
    expect([...sagas.createGraphicsCategory()].pop().type).toEqual(actionTypes.GRAPHICS_CATEGORY_FAILURE);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchGraphicsCategories()].pop().type).toEqual(actionTypes.GRAPHICS_CATEGORY_SUCCESS);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchGraphicsCategoryById({id: 0})].pop().type).toEqual(actionTypes.GRAPHICS_CATEGORY_SUCCESS);
  });

  test('should process fetching', () => {
    expect([...sagas.fetchGraphicsCategoryById()].pop().type).toEqual(actionTypes.GRAPHICS_CATEGORY_FAILURE);
  });

  test('should process fetching number', () => {
    expect([...sagas.fetchGraphicsCategoriesNumber()].pop().type).toEqual(actionTypes.GRAPHICS_CATEGORY_SUCCESS);
  });

  test('should process editing with error', () => {
    expect([...sagas.editGraphicsCategory()].pop().type).toEqual(actionTypes.GRAPHICS_CATEGORY_FAILURE);
  });

  test('should process deleting with error', () => {
    expect([...sagas.deleteGraphicsCategory()].pop().type).toEqual(actionTypes.GRAPHICS_CATEGORY_FAILURE);
  });
  test('should process uploading', () => {
    expect([...sagas.uploadThumbnail({thumb: {}})].pop().type).toEqual(actionTypes.GRAPHICS_CATEGORY_SUCCESS);
  });

  test('should process uploading with error', () => {
    expect([...sagas.uploadThumbnail()].pop().type).toEqual(actionTypes.GRAPHICS_CATEGORY_FAILURE);
  });
});
