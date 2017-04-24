import * as actionTypes from '../actionTypes/configurations';

const INITIAL_STATE = {
  configurations: [], configurationsError: null, configurationsLoading: false, configurationsMessage: null
};

export default function (state = INITIAL_STATE, action) {
  let configurationsError;
  switch (action.type) {
    case actionTypes.CONFIGURATION_OPERATION_SUCCESS:
      return {
        ...state,
        configurations: action.configurations || state.configurations,
        configurationsNumber: action.configurationsNumber || state.configurationsNumber,
        configurationsMessage: action.message || null,
        configurationsError: null,
        configurationsLoading: false
      };
    case actionTypes.CONFIGURATION_OPERATION_FAILURE:
      configurationsError = action.message;
      return {...state, configurationsMessage: null, configurationsError, configurationsLoading: false};
    case actionTypes.FETCH_CONFIGURATIONS:
      return {...state, configurationsMessage: null, configurationsError: null, configurationsLoading: true};
    case actionTypes.CREATE_CONFIGURATION:
      return {...state, configurationsMessage: null, configurationsError: null, configurationsLoading: true};
    case actionTypes.EDIT_CONFIGURATION:
      return {...state, configurationsMessage: null, configurationsError: null, configurationsLoading: true};
    case actionTypes.DELETE_CONFIGURATION:
      return {...state, configurationsMessage: null, configurationsError: null, configurationsLoading: true};
    default:
      return state;
  }
}
