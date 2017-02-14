import * as actionType from '../actions/colorgroups';

const INITIAL_STATE = {
  colorgroups: [], colorgroupsNumber: 0, error: null, loading: false
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case actionType.COLORGROUP_OPERATION_SUCCESS:
      return {
        ...state,
        colorgroups: action.colorgroups || state.colorgroups,
        colorgroupsNumber: action.colorgroupsNumber || state.colorgroupsNumber,
        error: null,
        loading: false
      };
    case actionType.COLORGROUP_OPERATION_FAILURE:
      error = action.message;
      return {...state, error, loading: false};
    case actionType.FETCH_COLORGROUPS:
      return {...state, colorgroups: [], error: null, loading: true};
    case actionType.FETCH_COLORGROUPS_NUMBER:
      return {...state, colorgroupsNumber: 0, error: null, loading: true};
    case actionType.CREATE_COLORGROUP:
      return {...state, error: null, loading: true};
    case actionType.EDIT_COLORGROUP:
      return {...state, error: null, loading: true};
    case actionType.DELETE_COLORGROUP:
      return {...state, error: null, loading: true};
    default:
      return state;
  }
}
