import * as actionTypes from '../actionTypes/files';
import {dispatch} from './sagaFuncs';
import * as api from './api';

export function* uploadFile(action) {
  try {
    const data = new FormData();
    data.append('file', action.file);
    yield* api.upload(action.endpoint, data);
    yield dispatch({type: actionTypes.FILE_OPERATION_SUCCESS});
  } catch (e) {
    yield dispatch({type: actionTypes.FILE_OPERATION_FAILURE, message: e});
  }
}
