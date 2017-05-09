import * as actionTypes from '../actionTypes/files';

export const uploadFile = (file, endpoint) => {
  return {
    type: actionTypes.UPLOAD_FILE,
    endpoint,
    file
  };
};
