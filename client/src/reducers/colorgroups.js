import * as actionTypes from '../actionTypes/colorgroups';

const INITIAL_STATE = {
  colorgroup: null,
  colorgroups: [],
  colorgroupsNumber: 0,
  colorgroupsError: null,
  colorgroupsLoading: false,
  colorgroupsMessage: null
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case actionTypes.COLORGROUP_OPERATION_SUCCESS:
      return {
        ...state,
        colorgroup: action.colorgroup || state.colorgroup,
        colorgroups: action.colorgroups || state.colorgroups,
        colorgroupsNumber: action.colorgroupsNumber || state.colorgroupsNumber,
        colorgroupsMessage: action.message || null,
        colorgroupsError: null,
        colorgroupsLoading: false
      };
    case actionTypes.COLORGROUP_OPERATION_FAILURE:
      error = action.message;
      return {...state, colorgroupsMessage: null, error, colorgroupsLoading: false};
    case actionTypes.FETCH_COLORGROUP_BY_ID:
      return {...state, colorgroup: null, colorgroupsMessage: null, colorgroupsError: null, colorgroupsLoading: true};
    case actionTypes.FETCH_COLORGROUPS:
      return {...state, colorgroupsMessage: null, colorgroupsError: null, colorgroupsLoading: true};
    case actionTypes.FETCH_COLORGROUPS_NUMBER:
      return {...state, colorgroupsMessage: null, colorgroupsNumber: 0, colorgroupsError: null, colorgroupsLoading: true};
    case actionTypes.CREATE_COLORGROUP:
      return {...state, colorgroupsMessage: null, colorgroupsError: null, colorgroupsLoading: true};
    case actionTypes.EDIT_COLORGROUP:
      return {...state, colorgroupsMessage: null, colorgroupsError: null, colorgroupsLoading: true};
    case actionTypes.DELETE_COLORGROUP:
      return {...state, colorgroupsMessage: null, colorgroupsError: null, colorgroupsLoading: true};
    default:
      return state;
  }
}
