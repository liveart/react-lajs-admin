export const SELECT_ROW = 'SELECT_ROW';
export const ENABLE_EDITING = 'ENABLE_EDITING';
export const DISABLE_EDITING = 'DISABLE_EDITING';

export const selectRow = selectedId => {
  return {
    type: SELECT_ROW,
    selectedRowId: selectedId
  };
};

export const enableEditing = () => {
  return {
    type: ENABLE_EDITING
  };
};

export const disableEditing = () => {
  return {
    type: DISABLE_EDITING
  };
};
