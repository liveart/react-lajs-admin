import * as actionTypes from '../actionTypes/colorgroups';

const INITIAL_STATE = {
  colorgroups: [], colorgroupsNumber: 0, colorgroupsError: null, colorgroupsLoading: false
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case actionTypes.COLORGROUP_OPERATION_SUCCESS:
      return {
        ...state,
        colorgroups: action.colorgroups || state.colorgroups,
        colorgroupsNumber: action.colorgroupsNumber || state.colorgroupsNumber,
        colorgroupsError: null,
        colorgroupsLoading: false
      };
    case actionTypes.COLORGROUP_OPERATION_FAILURE:
      error = action.message;
      return {...state, colorgroupsError: error, colorgroupsLoading: false};
    case actionTypes.FETCH_COLORGROUPS:
      return {...state, colorgroups: [], colorgroupsError: null, colorgroupsLoading: true};
    case actionTypes.FETCH_COLORGROUPS_NUMBER:
      return {...state, colorgroupsNumber: 0, colorgroupsError: null, colorgroupsLoading: true};
    case actionTypes.CREATE_COLORGROUP:
      return {...state, colorgroupsError: null, colorgroupsLoading: true};
    case actionTypes.EDIT_COLORGROUP:
      return {...state, colorgroupsError: null, colorgroupsLoading: true};
    case actionTypes.DELETE_COLORGROUP:
      return {...state, colorgroupsError: null, colorgroupsLoading: true};
    default:
      return state;
  }
}
