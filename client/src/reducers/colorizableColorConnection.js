import * as actionTypes from '../actionTypes/colorizableColorConnection';

const INITIAL_STATE = {
  colorizableId: null,
  colorizableColorConnections: [],
  colorizableColorConnectionsError: null,
  colorizableColorConnectionsLoading: false
};

export default function (state = INITIAL_STATE, action) {
  let colorizableColorConnectionsError;
  switch (action.type) {
    case actionTypes.COLORIZABLE_COLOR_CONNECTION_OPERATION_SUCCESS:
      return {
        ...state,
        colorizableColorConnections: action.colorizableColorConnections || state.colorizableColorConnections,
        colorizableColorConnectionsError: null,
        colorizableColorConnectionsLoading: false
      };
    case actionTypes.COLORIZABLE_COLOR_CONNECTION_OPERATION_FAILURE:
      colorizableColorConnectionsError = action.message;
      return {
        ...state,
        colorizableId: null,
        colorizableColorConnectionsError,
        colorizableColorConnectionsLoading: false
      };
    case actionTypes.FETCH_COLORIZABLE_COLOR_CONNECTIONS:
      return {
        ...state,
        colorizableId: action.colorizableId,
        colorizableColorConnections: [],
        colorizableColorConnectionsError: null,
        colorizableColorConnectionsLoading: true
      };
    case actionTypes.CREATE_COLORIZABLE_COLOR_CONNECTION:
      return {...state, colorizableColorConnectionsError: null, colorizableColorConnectionsLoading: true};
    case actionTypes.EDIT_COLORIZABLE_COLOR_CONNECTION:
      return {...state, colorizableColorConnectionsError: null, colorizableColorConnectionsLoading: true};
    case actionTypes.DELETE_COLORIZABLE_COLOR_CONNECTION:
      return {...state, colorizableColorConnectionsError: null, colorizableColorConnectionsLoading: true};
    default:
      return state;
  }
}
