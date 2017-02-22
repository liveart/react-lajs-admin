export const SELECT_ROW = 'SELECT_ROW';
export const SELECT_2TABLE_ROW = 'SELECT_2TABLE_ROW';
export const ENABLE_EDITING = 'ENABLE_EDITING';
export const ENABLE_CREATING = 'ENABLE_CREATING';
export const ENABLE_DEFAULT_STATUS = 'ENABLE_DEFAULT_STATUS';

export const selectRow = selectedId => {
  return {
    type: actionTypes.SELECT_ROW,
    selectedRowId: selectedId
  };
};

export const selectSecondaryRow = selectedId => {
  return {
    type: SELECT_2TABLE_ROW,
    selected2RowId: selectedId
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
