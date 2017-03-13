import * as actionTypes from '../actionTypes/colorizable';

const INITIAL_STATE = {
  graphicId: null, colorizables: [], colorizablesError: null, colorizablesLoading: false
};

export default function (state = INITIAL_STATE, action) {
  let colorizablesError;
  switch (action.type) {
    case actionTypes.COLORIZABLE_OPERATION_SUCCESS:
      return {
        ...state,
        colorizables: action.colorizables || state.colorizables,
        colorizablesError: null,
        colorizablesLoading: false
      };
    case actionTypes.COLORIZABLE_OPERATION_FAILURE:
      colorizablesError = action.message;
      return {...state, graphicId: null, colorizables: [], colorizablesError, colorizablesLoading: false};
    case actionTypes.FETCH_COLORIZABLES:
      return {
        ...state,
        graphicId: action.graphicId,
        colorizables: [],
        colorizablesError: null,
        colorizablesLoading: true
      };
    case actionTypes.CREATE_COLORIZABLE:
      return {...state, graphicId: action.graphicId, colorizablesError: null, colorizablesLoading: true};
    case actionTypes.EDIT_COLORIZABLE:
      return {...state, graphicId: action.graphicId, colorizablesError: null, colorizablesLoading: true};
    case actionTypes.DELETE_COLORIZABLE:
      return {...state, graphicId: action.graphicId, colorizablesError: null, colorizablesLoading: true};
    default:
      return state;
  }
}
