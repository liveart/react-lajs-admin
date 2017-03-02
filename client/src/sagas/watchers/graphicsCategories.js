import {takeLatest} from 'redux-saga';
import * as actionTypes from '../../actionTypes/graphicsCategories';
import * as fontsSagas from '../graphicsCategories';

export function* watchFetchGraphicsCategories() {
  yield takeLatest(actionTypes.FETCH_GRAPHICS_CATEGORIES, fontsSagas.fetchGraphicsCategories);
}

export function* watchFetchGraphicsCategoryById() {
  yield takeLatest(actionTypes.FETCH_GRAPHICS_CATEGORIES_BY_ID, fontsSagas.fetchGraphicsCategoryById);
}

export function* watchFetchGraphicsCategoriesNumber() {
  yield takeLatest(actionTypes.FETCH_GRAPHICS_CATEGORIES_NUMBER, fontsSagas.fetchGraphicsCategoriesNumber);
}

export function* watchCreateGraphicsCategory() {
  yield takeLatest(actionTypes.CREATE_GRAPHICS_CATEGORIES, fontsSagas.createGraphicsCategory);
}

export function* watchUploadThumbnail() {
  yield takeLatest(actionTypes.UPLOAD_THUMBNAIL, fontsSagas.uploadThumbnail);
}

export function* watchEditGraphicsCategory() {
  yield takeLatest(actionTypes.EDIT_GRAPHICS_CATEGORY, fontsSagas.editGraphicsCategory);
}

export function* watchDeleteGraphicsCategory() {
  yield takeLatest(actionTypes.DELETE_GRAPHICS_CATEGORY, fontsSagas.deleteGraphicsCategory);
}
