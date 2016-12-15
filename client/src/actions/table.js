export const SELECT_ROW = 'SELECT_ROW';

export function selectRow(selectedId) {
  return {
    type: SELECT_ROW,
    selectedRowId: selectedId
  };
}
