import * as actionTypes from '../actionTypes/graphics';

const INITIAL_STATE = {
  graphics: [], graphicsNumber: 0, graphicsError: null, graphicsLoading: false, graphicsMessage: null
};

export default function (state = INITIAL_STATE, action) {
  let graphicsError;
  switch (action.type) {
    case actionTypes.GRAPHIC_OPERATION_SUCCESS:
      return {
        ...state,
        graphics: action.graphics || state.graphics,
        graphicsNumber: action.graphicsNumber || state.graphicsNumber,
        graphicsMessage: action.message || null,
        graphicsError: null,
        graphicsLoading: false
      };
    case actionTypes.GRAPHIC_OPERATION_FAILURE:
      graphicsError = action.message;
      return {...state, graphicsMessage: null, graphicsError, graphicsLoading: false};
    case actionTypes.FETCH_GRAPHICS:
      return {...state, graphicsMessage: null, graphicsError: null, graphicsLoading: true};
    case actionTypes.FETCH_GRAPHICS_NUMBER:
      return {...state, graphicsMessage: null, graphicsNumber: 0, graphicsError: null, graphicsLoading: true};
    case actionTypes.CREATE_GRAPHIC:
      return {...state, graphicsMessage: null, graphicsError: null, graphicsLoading: true};
    case actionTypes.UPLOAD_GRAPHIC_IMAGE:
      return {...state, graphicsMessage: null, graphicsError: null, graphicsLoading: true};
    case actionTypes.UPLOAD_GRAPHIC_THUMB:
      return {...state, graphicsMessage: null, graphicsError: null, graphicsLoading: true};
    case actionTypes.EDIT_GRAPHIC:
      return {...state, graphicsMessage: null, graphicsError: null, graphicsLoading: true};
    case actionTypes.DELETE_GRAPHIC:
      return {...state, graphicsMessage: null, graphicsError: null, graphicsLoading: true};
    default:
      return state;
  }
}
