import * as actionTypes from '../actionTypes/products';
import {dispatch} from './sagaFuncs';
import * as api from './api';
import {MESSAGE_ENTITY_CREATED, MESSAGE_ENTITY_UPDATED, MESSAGE_ENTITY_DELETED} from '../definitions';

const entityName = 'Product';
const endpoint = 'products';

export function* fetchProducts() {
  try {
    const res = yield* api.retrieve(endpoint);
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_SUCCESS, products: res});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_FAILURE, message: e.message});
  }
}

export function* fetchProductsNumber() {
  try {
    const res = yield* api.retrieveNumber(endpoint);
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_SUCCESS, productsNumber: res});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_FAILURE, message: e.message});
  }
}

export function* createProduct(action) {
  try {
    yield* api.create(endpoint, action.product, action.token);
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_SUCCESS, message: entityName + ' ' + MESSAGE_ENTITY_CREATED});
    yield dispatch({type: actionTypes.FETCH_PRODUCTS});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_FAILURE, message: e.message});
  }
}

export function* editProduct(action) {
  try {
    yield* api.update(endpoint, action.newProduct, action.id, action.token);
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_SUCCESS, message: entityName + ' ' + MESSAGE_ENTITY_UPDATED});
    yield dispatch({type: actionTypes.FETCH_PRODUCTS});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_FAILURE, message: e.message});
  }
}

export function* deleteProduct(action) {
  try {
    yield* api.remove(endpoint, action.id, action.token);
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_SUCCESS, message: entityName + ' ' + MESSAGE_ENTITY_DELETED});
    yield dispatch({type: actionTypes.FETCH_PRODUCTS});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_FAILURE, message: e.message});
  }
}
