import * as actionType from '../actionTypes/files';

const INITIAL_STATE = {uploading: false, error: null};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case actionType.UPLOAD_FILE:
      return {...state, uploading: true};
    case actionType.FILE_OPERATION_SUCCESS:
      return {...state, uploading: false, error: null};
    case actionType.FILE_OPERATION_FAILURE:
      error = action.message;
      return {...state, error, uploading: false};
    default:
      return state;
  }
}
