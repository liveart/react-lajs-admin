export const SELECT_ROW = 'SELECT_ROW';
export const ENABLE_EDITING = 'ENABLE_EDITING';

export function selectRow(selectedId) {
  return {
    type: SELECT_ROW,
    selectedRowId: selectedId
  };
}

export function enableEditing() {
  return {
    type: ENABLE_EDITING
  };
}
