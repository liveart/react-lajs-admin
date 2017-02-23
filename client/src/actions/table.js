export const SELECT_ROW = 'SELECT_ROW';
export const SET_OBJECT_HOLDER_PROPERTY = 'SET_OBJECT_HOLDER_PROPERTY';
export const SELECT_2TABLE_ROW = 'SELECT_2TABLE_ROW';
export const ENABLE_EDITING = 'ENABLE_EDITING';
export const ENABLE_CREATING = 'ENABLE_CREATING';
export const ENABLE_DEFAULT_STATUS = 'ENABLE_DEFAULT_STATUS';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';

export const selectRow = selectedObject => {
  return {
    type: SELECT_ROW,
    objectHolder: selectedObject
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
    type: ENABLE_EDITING
  };
};

export const enableCreating = () => {
  return {
    type: ENABLE_CREATING
  };
};

export const enableDefaultStatus = () => {
  return {
    type: ENABLE_DEFAULT_STATUS
  };
};

export const setObjectHolderProperty = (propertyName, value) => {
  return {
    type: SET_OBJECT_HOLDER_PROPERTY,
    propertyName,
    value
  };
};

export const setInitialState = () => {
  return {
    type: SET_INITIAL_STATE
  };
};
