import * as actionTypes from '../actionTypes/graphicsCategories';
import {dispatch} from './sagaFuncs';
import * as api from './api';
import {MESSAGE_ENTITY_CREATED, MESSAGE_ENTITY_UPDATED, MESSAGE_ENTITY_DELETED} from '../definitions';

const entityName = 'Graphic category';
const endpoint = 'graphicsCategories';

export function* fetchGraphicsCategories() {
  try {
    const res = yield* api.retrieve(endpoint);
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_SUCCESS, graphicsCategories: res});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_FAILURE, message: e});
  }
}
export function* fetchGraphicsCategoryById(action) {
  try {
    const res = yield* api.retrieve(endpoint, action.id);
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_SUCCESS, graphicsCategory: res});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_FAILURE, message: e});
  }
}
export function* fetchGraphicsCategoriesNumber() {
  try {
    const res = yield* api.retrieveNumber(endpoint);
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_SUCCESS, graphicsCategoriesNumber: res});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_FAILURE, message: e});
  }
}

export function* createGraphicsCategory(action) {
  try {
    yield* api.create(endpoint, action.graphicsCategory, action.token);
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_SUCCESS, message: entityName + ' ' + MESSAGE_ENTITY_CREATED});
    yield dispatch({type: actionTypes.FETCH_GRAPHICS_CATEGORIES});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_FAILURE, message: e});
  }
}

export function* editGraphicsCategory(action) {
  try {
    yield* api.update(endpoint, action.newGraphicsCategory, action.id, action.token);
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_SUCCESS, message: entityName + ' ' + MESSAGE_ENTITY_UPDATED});
    yield dispatch({type: actionTypes.FETCH_GRAPHICS_CATEGORIES});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_FAILURE, message: e});
  }
}

export function* deleteGraphicsCategory(action) {
  try {
    yield* api.remove(endpoint, action.id, action.token);
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_SUCCESS, message: entityName + ' ' + MESSAGE_ENTITY_DELETED});
    yield dispatch({type: actionTypes.FETCH_GRAPHICS_CATEGORIES});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_FAILURE, message: e});
  }
}

