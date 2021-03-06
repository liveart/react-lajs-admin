import * as actionTypes from '../actionTypes/productsCategories';
import {dispatch} from './sagaFuncs';
import * as api from './api';
import {MESSAGE_ENTITY_CREATED, MESSAGE_ENTITY_UPDATED, MESSAGE_ENTITY_DELETED} from '../definitions';

const entityName = 'Product category';
const endpoint = 'productsCategories';

export function* fetchProductsCategories() {
  try {
    const res = yield* api.retrieve(endpoint);
    yield dispatch({type: actionTypes.PRODUCTS_CATEGORY_SUCCESS, productsCategories: res});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCTS_CATEGORY_FAILURE, message: e});
  }
}

export function* fetchProductsCategoryById(action) {
  try {
    const res = yield* api.retrieve(endpoint, action.id);
    yield dispatch({type: actionTypes.PRODUCTS_CATEGORY_SUCCESS, productsCategory: res});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCTS_CATEGORY_FAILURE, message: e});
  }
}

export function* fetchProductsCategoriesNumber() {
  try {
    const res = yield* api.retrieveNumber(endpoint);
    yield dispatch({type: actionTypes.PRODUCTS_CATEGORY_SUCCESS, productsCategoriesNumber: res});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCTS_CATEGORY_FAILURE, message: e});
  }
}

export function* createProductsCategory(action) {
  try {
    yield* api.create(endpoint, action.productsCategory, action.token);
    yield dispatch({type: actionTypes.PRODUCTS_CATEGORY_SUCCESS, message: entityName + ' ' + MESSAGE_ENTITY_CREATED});
    yield dispatch({type: actionTypes.FETCH_PRODUCTS_CATEGORIES});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCTS_CATEGORY_FAILURE, message: e});
  }
}

export function* editProductsCategory(action) {
  try {
    yield* api.update(endpoint, action.newProductsCategory, action.id, action.token);
    yield dispatch({type: actionTypes.PRODUCTS_CATEGORY_SUCCESS, message: entityName + ' ' + MESSAGE_ENTITY_UPDATED});
    yield dispatch({type: actionTypes.FETCH_PRODUCTS_CATEGORIES});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCTS_CATEGORY_FAILURE, message: e});
  }
}

export function* deleteProductsCategory(action) {
  try {
    yield* api.remove(endpoint, action.id, action.token);
    yield dispatch({type: actionTypes.PRODUCTS_CATEGORY_SUCCESS, message: entityName + ' ' + MESSAGE_ENTITY_DELETED});
    yield dispatch({type: actionTypes.FETCH_PRODUCTS_CATEGORIES});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCTS_CATEGORY_FAILURE, message: e});
  }
}
