import * as actionType from '../actions/user';

const INITIAL_STATE = {
  email: '', password: null, token: null, loading: false, error: null
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case actionType.REMOVE_USER_TOKEN:
      return {
        ...state,
        email: null,
        token: null,
        error: null,
        loading: false
      };
    case actionType.GET_USER_TOKEN:
      return {
        ...state,
        email: action.email,
        password: action.password,
        token: null,
        error: null,
        loading: true
      };
    case actionType.GET_TOKEN_RESULT:
      error = action.message || '';
      return {
        ...state,
        password: null,
        token: action.token,
        error,
        loading: false
      };
    default:
      return state;
  }
}
