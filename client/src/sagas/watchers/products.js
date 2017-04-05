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

export function* watchUploadProductImage() {
  yield takeLatest(actionTypes.UPLOAD_PRODUCT_IMAGE, productsSagas.uploadProductImage);
}

export function* watchUploadProductLocationImage() {
  yield takeLatest(actionTypes.UPLOAD_PRODUCT_LOCATION_IMAGE, productsSagas.uploadProductLocationImage);
}

export function* watchUploadProductLocationMask() {
  yield takeLatest(actionTypes.UPLOAD_PRODUCT_LOCATION_MASK, productsSagas.uploadProductLocationMask);
}

export function* watchUploadProductLocationOverlay() {
  yield takeLatest(actionTypes.UPLOAD_PRODUCT_LOCATION_OVERLAY, productsSagas.uploadProductLocationOverlay);
}

export function* watchUploadProductThumb() {
  yield takeLatest(actionTypes.UPLOAD_PRODUCT_THUMB, productsSagas.uploadProductThumb);
}

export function* watchUploadProductTemplate() {
  yield takeLatest(actionTypes.UPLOAD_PRODUCT_TEMPLATE, productsSagas.uploadProductTemplate);
}
