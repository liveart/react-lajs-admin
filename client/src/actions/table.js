import * as actionTypes from '../actionTypes/table';

export const selectRow = selectedId => {
  return {
    type: actionTypes.SELECT_ROW,
    selectedRowId: selectedId
  };
};

export const enableEditing = () => {
  return {
    type: actionTypes.ENABLE_EDITING
  };
};

export const enableCreating = () => {
  return {
    type: actionTypes.ENABLE_CREATING
  };
};

export const enableUploading = () => {
  return {
    type: actionTypes.ENABLE_UPLOADING
  };
};

export const enableDefaultStatus = () => {
  return {
    type: actionTypes.ENABLE_DEFAULT_STATUS
  };
};
