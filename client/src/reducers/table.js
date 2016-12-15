import {SELECT_ROW} from '../actions/table';

const INITIAL_STATE = {
  selectedRowId: -1
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_ROW:
      return {...state, selectedRowId: action.selectedRowId};
    default:
      return state;
  }
}
