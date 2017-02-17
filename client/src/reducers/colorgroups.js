import * as actionTypes from '../actionTypes/colorgroups';

const INITIAL_STATE = {
  colorgroups: [], colorgroupsNumber: 0, error: null, loading: false
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case actionTypes.COLORGROUP_OPERATION_SUCCESS:
      return {
        ...state,
        colorgroups: action.colorgroups || state.colorgroups,
        colorgroupsNumber: action.colorgroupsNumber || state.colorgroupsNumber,
        error: null,
        loading: false
      };
    case actionTypes.COLORGROUP_OPERATION_FAILURE:
      error = action.message;
      return {...state, error, loading: false};
    case actionTypes.FETCH_COLORGROUPS:
      return {...state, colorgroups: [], error: null, loading: true};
    case actionTypes.FETCH_COLORGROUPS_NUMBER:
      return {...state, colorgroupsNumber: 0, error: null, loading: true};
    case actionTypes.CREATE_COLORGROUP:
      return {...state, error: null, loading: true};
    case actionTypes.EDIT_COLORGROUP:
      return {...state, error: null, loading: true};
    case actionTypes.DELETE_COLORGROUP:
      return {...state, error: null, loading: true};
    default:
      return state;
  }
}
