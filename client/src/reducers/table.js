import {SELECT_ROW, ENABLE_EDITING, DISABLE_EDITING} from '../actions/table';

const INITIAL_STATE = {
  selectedRowId: -1,
  editing: false
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_ROW:
      return {...state, selectedRowId: action.selectedRowId};
    case ENABLE_EDITING:
      return {...state, editing: true};
    case DISABLE_EDITING:
      return {...state, editing: false};
    default:
      return state;
  }
}
