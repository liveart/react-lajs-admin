import {SELECT_ROW, SELECT_2TABLE_ROW, ENABLE_EDITING, ENABLE_CREATING, ENABLE_DEFAULT_STATUS} from '../actions/table';
import {STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../definitions';

const INITIAL_STATE = {
  selectedRowId: null,
  selected2RowId: null,
  status: STATUS_DEFAULT
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_ROW:
      return {...state, selectedRowId: action.selectedRowId === state.selectedRowId ? null : action.selectedRowId};
    case SELECT_2TABLE_ROW:
      return {...state, selected2RowId: action.selected2RowId === state.selected2RowId ? null : action.selected2RowId};
    case ENABLE_EDITING:
      return {...state, status: STATUS_EDITING};
    case ENABLE_CREATING:
      return {...state, status: STATUS_CREATING};
    case ENABLE_DEFAULT_STATUS:
      return {...state, status: STATUS_DEFAULT};
    default:
      return state;
  }
}
