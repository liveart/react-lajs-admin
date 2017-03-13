import {takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../../actionTypes/graphics';
import * as graphicsSagas from '../graphics';

export function* watchFetchGraphics() {
  yield takeLatest(actionTypes.FETCH_GRAPHICS, graphicsSagas.fetchGraphics);
}

export function* watchFetchGraphicsNumber() {
  yield takeLatest(actionTypes.FETCH_GRAPHICS_NUMBER, graphicsSagas.fetchGraphicsNumber);
}

export function* watchCreateGraphic() {
  yield takeLatest(actionTypes.CREATE_GRAPHIC, graphicsSagas.createGraphic);
}

export function* watchEditGraphic() {
  yield takeLatest(actionTypes.EDIT_GRAPHIC, graphicsSagas.editGraphic);
}

export function* watchDeleteGraphic() {
  yield takeLatest(actionTypes.DELETE_GRAPHIC, graphicsSagas.deleteGraphic);
}

export function* watchUploadGraphicImage() {
  yield takeLatest(actionTypes.UPLOAD_GRAPHIC_IMAGE, graphicsSagas.uploadGraphicImage);
}

export function* watchUploadGraphicThumb() {
  yield takeLatest(actionTypes.UPLOAD_GRAPHIC_THUMB, graphicsSagas.uploadGraphicThumb);
}
