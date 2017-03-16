import * as actionTypes from '../actionTypes/graphics';
import {dispatch} from './sagaFuncs';
import * as api from './api';

const endpoint = 'graphics';
const imagesEndpoint = 'containers/graphicImages';
const thumbsEndpoint = 'containers/graphicThumbs';

export function* fetchGraphics() {
  try {
    const res = yield* api.retrieve(endpoint);
    yield dispatch({type: actionTypes.GRAPHIC_OPERATION_SUCCESS, graphics: res});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHIC_OPERATION_FAILURE, message: e.message});
  }
}

export function* fetchGraphicsNumber() {
  try {
    const res = yield* api.retrieveNumber(endpoint);
    yield dispatch({type: actionTypes.GRAPHIC_OPERATION_SUCCESS, graphicsNumber: res});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHIC_OPERATION_FAILURE, message: e.message});
  }
}

export function* createGraphic(action) {
  try {
    yield* api.create(endpoint, action.graphic, action.token);
    yield dispatch({type: actionTypes.GRAPHIC_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_GRAPHICS});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHIC_OPERATION_FAILURE, message: e.message});
  }
}

export function* editGraphic(action) {
  try {
    yield* api.update(endpoint, action.newGraphic, action.id, action.token);
    yield dispatch({type: actionTypes.GRAPHIC_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_GRAPHICS});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHIC_OPERATION_FAILURE, message: e.message});
  }
}

export function* deleteGraphic(action) {
  try {
    yield* api.remove(endpoint, action.id, action.token);
    yield dispatch({type: actionTypes.GRAPHIC_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_GRAPHICS});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHIC_OPERATION_FAILURE, message: e.message});
  }
}

export function* uploadGraphicImage(action) {
  try {
    const data = new FormData();
    data.append('file', action.imageFile);
    yield* api.upload(imagesEndpoint, data);
    yield dispatch({type: actionTypes.GRAPHIC_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_GRAPHICS});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHIC_OPERATION_FAILURE, message: e});
  }
}

export function* uploadGraphicThumb(action) {
  try {
    const data = new FormData();
    data.append('file', action.thumbFile);
    yield* api.upload(thumbsEndpoint, data);
    yield dispatch({type: actionTypes.GRAPHIC_OPERATION_SUCCESS});
    yield dispatch({type: actionTypes.FETCH_GRAPHICS});
  } catch (e) {
    yield dispatch({type: actionTypes.GRAPHIC_OPERATION_FAILURE, message: e});
  }
}
