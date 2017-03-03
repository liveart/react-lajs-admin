import * as actionTypes from '../actionTypes/graphics';

const INITIAL_STATE = {
  graphics: [], graphicsNumber: 0, graphicsError: null, graphicsLoading: false
};

export default function (state = INITIAL_STATE, action) {
  let graphicsError;
  switch (action.type) {
    case actionTypes.GRAPHIC_OPERATION_SUCCESS:
      return {
        ...state,
        graphics: action.graphics || state.graphics,
        graphicsNumber: action.graphicsNumber || state.graphicsNumber,
        graphicsError: null,
        graphicsLoading: false
      };
    case actionTypes.GRAPHIC_OPERATION_FAILURE:
      graphicsError = action.message;
      return {...state, graphicsError, graphicsLoading: false};
    case actionTypes.FETCH_GRAPHICS:
      return {...state, graphics: [], graphicsError: null, graphicsLoading: true};
    case actionTypes.FETCH_GRAPHICS_NUMBER:
      return {...state, graphicsNumber: 0, graphicsError: null, graphicsLoading: true};
    case actionTypes.CREATE_GRAPHIC:
      return {...state, graphicsError: null, graphicsLoading: true};
    case actionTypes.EDIT_GRAPHIC:
      return {...state, graphicsError: null, graphicsLoading: true};
    case actionTypes.DELETE_GRAPHIC:
      return {...state, graphicsError: null, graphicsLoading: true};
    default:
      return state;
  }
}
