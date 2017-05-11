import * as actionTypes from '../actionTypes/fonts';
import {dispatch} from './sagaFuncs';
import * as api from './api';
import {MESSAGE_ENTITY_CREATED, MESSAGE_ENTITY_UPDATED, MESSAGE_ENTITY_DELETED} from '../definitions';

const entityName = 'Font';
const endpoint = 'fonts';

export function* fetchFonts() {
  try {
    const res = yield* api.retrieve(endpoint + '?filter[order]=name');
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS, fonts: res});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e});
  }
}
export function* fetchFontById(action) {
  try {
    const res = yield* api.retrieve(endpoint, action.id);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS, font: res});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e});
  }
}
export function* fetchFontsNumber() {
  try {
    const res = yield* api.retrieveNumber(endpoint);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS, fontsNumber: res});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e});
  }
}

export function* createFont(action) {
  try {
    yield* api.create(endpoint, action.font, action.token);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS, message: entityName + ' ' + MESSAGE_ENTITY_CREATED});
    yield dispatch({type: actionTypes.FETCH_FONTS});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e.message});
  }
}

export function* editFont(action) {
  try {
    yield* api.update(endpoint, action.newFont, action.id, action.token);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS, message: entityName + ' ' + MESSAGE_ENTITY_UPDATED});
    yield dispatch({type: actionTypes.FETCH_FONTS});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e.message});
  }
}

export function* deleteFont(action) {
  try {
    yield* api.remove(endpoint, action.id, action.token);
    yield dispatch({type: actionTypes.FONTS_OPERATION_SUCCESS, message: entityName + ' ' + MESSAGE_ENTITY_DELETED});
    yield dispatch({type: actionTypes.FETCH_FONTS});
  } catch (e) {
    yield dispatch({type: actionTypes.FONTS_OPERATION_FAILURE, message: e.message});
  }
}
