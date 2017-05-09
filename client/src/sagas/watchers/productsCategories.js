import {takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../../actionTypes/productsCategories';
import * as productsCategoriesSagas from '../productsCategories';

export function* watchFetchProductsCategories() {
  yield takeLatest(actionTypes.FETCH_PRODUCTS_CATEGORIES, productsCategoriesSagas.fetchProductsCategories);
}

export function* watchFetchProductsCategoryById() {
  yield takeLatest(actionTypes.FETCH_PRODUCTS_CATEGORIES_BY_ID, productsCategoriesSagas.fetchProductsCategoryById);
}

export function* watchFetchProductsCategoriesNumber() {
  yield takeLatest(actionTypes.FETCH_PRODUCTS_CATEGORIES_NUMBER, productsCategoriesSagas.fetchProductsCategoriesNumber);
}

export function* watchCreateProductsCategory() {
  yield takeLatest(actionTypes.CREATE_PRODUCTS_CATEGORIES, productsCategoriesSagas.createProductsCategory);
}

export function* watchEditProductsCategory() {
  yield takeLatest(actionTypes.EDIT_PRODUCTS_CATEGORY, productsCategoriesSagas.editProductsCategory);
}

export function* watchDeleteProductsCategory() {
  yield takeLatest(actionTypes.DELETE_PRODUCTS_CATEGORY, productsCategoriesSagas.deleteProductsCategory);
}

