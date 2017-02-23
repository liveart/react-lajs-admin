import {
  SELECT_ROW, SELECT_2TABLE_ROW, ENABLE_EDITING, ENABLE_CREATING,
  ENABLE_DEFAULT_STATUS, SET_OBJECT_HOLDER_PROPERTY
} from '../actions/table';
import {STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../definitions';

const INITIAL_STATE = {
  objectHolder: null,
  selected2RowId: null,
  status: STATUS_DEFAULT
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_ROW:
      return {
        ...state, objectHolder: JSON.stringify(action.objectHolder) ===
        JSON.stringify(state.objectHolder) ? null : Object.assign({}, action.objectHolder)
      };

    case SET_OBJECT_HOLDER_PROPERTY:
      let newObj = state.objectHolder;
      newObj[action.propertyName] = action.value;
      return {
        ...state, objectHolder: Object.assign({}, newObj)
      };
    case SELECT_2TABLE_ROW:
      return {
        ...state, selected2RowId: action.selected2RowId ===
        state.selected2RowId ? null : action.selected2RowId
      };
    case ENABLE_EDITING:
      return {...state, status: STATUS_EDITING};
    case ENABLE_CREATING:
      return {...state, status: STATUS_CREATING, objectHolder: {}};
    case ENABLE_DEFAULT_STATUS:
      return {...state, status: STATUS_DEFAULT, objectHolder: null};
    default:
      return state;
  }
}
