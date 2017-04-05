import * as actionTypes from '../actionTypes/products';
import {dispatch} from './sagaFuncs';
import * as api from './api';

const endpoint = 'products';
const imagesEndpoint = 'containers/productImages';
const thumbsEndpoint = 'containers/productThumbs';
const templateEndpoint = 'containers/productTemplates';

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
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_PRODUCTS});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_FAILURE, message: e.message});
  }
}

export function* editProduct(action) {
  try {
    yield* api.update(endpoint, action.newProduct, action.id, action.token);
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_PRODUCTS});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_FAILURE, message: e.message});
  }
}

export function* deleteProduct(action) {
  try {
    yield* api.remove(endpoint, action.id, action.token);
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_PRODUCTS});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_FAILURE, message: e.message});
  }
}

export function* uploadProductImage(action) {
  try {
    const data = new FormData();
    data.append('file', action.imageFile);
    yield* api.upload(imagesEndpoint, data);
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_PRODUCTS});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_FAILURE, message: e});
  }
}

export function* uploadProductThumb(action) {
  try {
    const data = new FormData();
    data.append('blob', action.thumbFile, action.thumbFile.name);
    yield* api.upload(thumbsEndpoint, data);
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_PRODUCTS});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_FAILURE, message: e});
  }
}

export function* uploadProductTemplate(action) {
  try {
    const data = new FormData();
    data.append('file', action.templateFile);
    yield* api.upload(templateEndpoint, data);
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_PRODUCTS});
  } catch (e) {
    yield dispatch({type: actionTypes.PRODUCT_OPERATION_FAILURE, message: e});
  }
}
