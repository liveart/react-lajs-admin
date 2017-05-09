import {takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../../actionTypes/products';
import * as productsSagas from '../products';

export function* watchFetchProducts() {
  yield takeLatest(actionTypes.FETCH_PRODUCTS, productsSagas.fetchProducts);
}

export function* watchFetchProductsNumber() {
  yield takeLatest(actionTypes.FETCH_PRODUCTS_NUMBER, productsSagas.fetchProductsNumber);
}

export function* watchCreateProduct() {
  yield takeLatest(actionTypes.CREATE_PRODUCT, productsSagas.createProduct);
}

export function* watchEditProduct() {
  yield takeLatest(actionTypes.EDIT_PRODUCT, productsSagas.editProduct);
}

export function* watchDeleteProduct() {
  yield takeLatest(actionTypes.DELETE_PRODUCT, productsSagas.deleteProduct);
}
