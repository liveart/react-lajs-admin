import {put, call} from 'redux-saga/effects';
import * as actionTypes from '../actionTypes/graphicsCategories';
import {dispatch} from './sagaFuncs';
import * as api from './api';

const endpoint = 'graphicsCategories';
const endpointUpload = 'containers/thumb';

export function* fetchGraphicsCategories() {
  try {
    const res = yield* api.retrieve(endpoint);
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_SUCCESS, graphicsCategories: res});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_FAILURE, message: e});
  }
}
export function* fetchGraphicsCategoryById(action) {
  try {
    const res = yield* api.retrieve(endpoint, action.id);
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_SUCCESS, graphicsCategory: res});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_FAILURE, message: e});
  }
}
export function* fetchGraphicsCategoriesNumber() {
  try {
    const res = yield* api.retrieveNumber(endpoint);
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_SUCCESS, graphicsCategoriesNumber: res});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_FAILURE, message: e});
  }
}

export function* createGraphicsCategory(action) {
  try {
    yield* api.create(endpoint, action.font, action.token);
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_GRAPHICS_CATEGORIES});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_FAILURE, message: e});
  }
}

export function* editGraphicsCategory(action) {
  try {
    yield* api.update(endpoint, action.newFont, action.id, action.token);
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_GRAPHICS_CATEGORIES});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_FAILURE, message: e});
  }
}

export function* deleteGraphicsCategory(action) {
  try {
    yield* api.remove(endpoint, action.id, action.token);
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_GRAPHICS_CATEGORIES});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_FAILURE, message: e});
  }
}
export function* uploadThumbnail(action) {
  try {
    const data = new FormData();
    data.append('file', action.thumbnail);
    yield* api.upload(endpointUpload, data);
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_SUCCESS});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHICS_CATEGORY_FAILURE, message: e});
  }
}





