import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../../actionTypes/graphics';
import * as graphicsSagas from '../graphics';

export function* watchFetchGraphics() {
  yield takeEvery(actionTypes.FETCH_GRAPHICS, graphicsSagas.fetchGraphics);
}

export function* watchFetchGraphicsNumber() {
  yield takeEvery(actionTypes.FETCH_GRAPHICS_NUMBER, graphicsSagas.fetchGraphicsNumber);
}

export function* watchCreateGraphic() {
  yield takeEvery(actionTypes.CREATE_GRAPHIC, graphicsSagas.createGraphic);
}

export function* watchEditGraphic() {
  yield takeEvery(actionTypes.EDIT_GRAPHIC, graphicsSagas.editGraphic);
}

export function* watchDeleteGraphic() {
  yield takeEvery(actionTypes.DELETE_GRAPHIC, graphicsSagas.deleteGraphic);
}
