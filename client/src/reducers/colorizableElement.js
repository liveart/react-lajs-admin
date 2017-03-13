import * as actionTypes from '../actionTypes/colorizableElement';

const INITIAL_STATE = {
  colorizableElements: [], colorizableElementsError: null, colorizableElementsLoading: false
};

export default function (state = INITIAL_STATE, action) {
  let colorizableElementsError;
  switch (action.type) {
    case actionTypes.COLORIZABLEELEMENT_OPERATION_SUCCESS:
      return {
        ...state,
        colorizableElements: action.colorizableElements || state.colorizableElements,
        colorizableElementsError: null,
        colorizableElementsLoading: false
      };
    case actionTypes.COLORIZABLEELEMENT_OPERATION_FAILURE:
      colorizableElementsError = action.message;
      return {...state, colorizableElementsError, colorizableElementsLoading: false};
    case actionTypes.FETCH_COLORIZABLEELEMENTS:
      return {
        ...state,
        colorizableElements: [],
        colorizableElementsError: null,
        colorizableElementsLoading: true
      };
    case actionTypes.CREATE_COLORIZABLEELEMENT:
      return {...state, colorizableElementsError: null, colorizableElementsLoading: true};
    case actionTypes.EDIT_COLORIZABLEELEMENT:
      return {...state, colorizableElementsError: null, colorizableElementsLoading: true};
    case actionTypes.DELETE_COLORIZABLEELEMENT:
      return {...state, colorizableElementsError: null, colorizableElementsLoading: true};
    default:
      return state;
  }
}
