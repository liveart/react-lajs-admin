import {SELECT_ROW, ENABLE_EDITING, ENABLE_CREATING, ENABLE_UPLOADING, ENABLE_DEFAULT_STATUS} from '../actionTypes/table';
import {STATUS_EDITING, STATUS_CREATING, STATUS_DEFAULT} from '../definitions';

const INITIAL_STATE = {
  selectedRowId: -1,
  status: STATUS_DEFAULT
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_ROW:
      return {...state, selectedRowId: action.selectedRowId};
    case ENABLE_EDITING:
      return {...state, status: STATUS_EDITING};
    case ENABLE_CREATING:
      return {...state, status: STATUS_CREATING};
    case ENABLE_UPLOADING:
      return {...state, status: ENABLE_UPLOADING};
    case ENABLE_DEFAULT_STATUS:
      return {...state, status: STATUS_DEFAULT};
    default:
      return state;
  }
}
